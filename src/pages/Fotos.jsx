import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { BsCalendar, BsBuilding, BsFileEarmarkImage } from "react-icons/bs"; // Importa iconos de Bootstrap

const Fotos = () => {
    const [fecha, setFecha] = useState("");
    const [sector, setSector] = useState("");
    const [archivos, setArchivos] = useState([]);
    const [fotosPorSector, setFotosPorSector] = useState({});
    const [error, setError] = useState(null);


// Función para obtener datos desde Firestore
const fetchData = async () => {
    try {
        const fotosData = await db.collection("fotos").get();
        const fotosPorSectorData = {};
        fotosData.forEach((doc) => {
            const data = doc.data();
            fotosPorSectorData[data.sector] = fotosPorSectorData[data.sector]
                ? [...fotosPorSectorData[data.sector], { fecha: data.fecha, fotos: data.fotos }]
                : [{ fecha: data.fecha, fotos: data.fotos }];
        });
        setFotosPorSector(fotosPorSectorData);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
};

useEffect(() => {
    fetchData();
}, []); 




    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };

    const handleSectorChange = (e) => {
        setSector(e.target.value);
    };

    const handleArchivoChange = (e) => {
        const nuevoArchivo = e.target.files[0];
        setArchivos((prevArchivos) => [...prevArchivos, nuevoArchivo]);
    };

    const handleAgregarArchivo = () => {
        const archivosContainer = document.getElementById("archivosContainer");

        const nuevoInputContainer = document.createElement("div");
        nuevoInputContainer.className = " mb-3";

        const nuevoInput = document.createElement("input");
        nuevoInput.type = "file";
        nuevoInput.className = "form-control";
        nuevoInput.addEventListener("change", handleArchivoChange);

        nuevoInputContainer.appendChild(nuevoInput);
        archivosContainer.appendChild(nuevoInputContainer);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await handleEnviar();
    };

    const handleEnviar = async () => {
        try {
            const fotosURLs = await Promise.all(
                archivos.map(async (archivo) => {
                    const storageRef = storage.ref();
                    const fechaStr = fecha.replace(/-/g, "");
                    const nombreArchivo = `${sector}_${fechaStr}_${archivo.name}`;
                    const fotoRef = storageRef.child(nombreArchivo);

                    await fotoRef.put(archivo);
                    const fotoURL = await fotoRef.getDownloadURL();

                    return { url: fotoURL };
                })
            );

            await db.collection("fotos").add({
                fecha,
                sector,
                fotos: fotosURLs,
            });

            setFotosPorSector((prevFotos) => ({
                ...prevFotos,
                [sector]: prevFotos[sector]
                    ? [...prevFotos[sector], { fotos: fotosURLs, fecha }] // Almacenar fecha junto con las fotos
                    : [{ fotos: fotosURLs, fecha }],
            }));
            setError(null);
            setFecha("");
            setSector("");
            setArchivos([]);
            document.getElementById("archivosContainer").innerHTML = "";
        } catch (error) {
            console.error("Error al subir archivos:", error);
            setError(
                "Error al subir archivos. Verifica la consola para más detalles."
            );
        }
    };

    return (
        <div className="container mt-5">
            <h1>Fotos</h1>
            <h4>Subir Fotos</h4>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3 input-group">
                    <span className="input-group-text">
                        <BsCalendar />
                    </span>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Fecha"
                        value={fecha}
                        onChange={handleFechaChange}
                    />
                </div>
                <div className="mb-3 input-group">
                    <span className="input-group-text">
                        <BsBuilding />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nivel"
                        value={sector}
                        onChange={handleSectorChange}
                    />
                </div>

                <div id="archivosContainer" className="">
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <BsFileEarmarkImage />
                        </span>

                        <input
                            type="file"
                            className="form-control"
                            placeholder="Archivo"
                            onChange={handleArchivoChange}
                        />

                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAgregarArchivo}
                >
                    Agregar Archivo
                </button>
                <div className="text-center ">
                    <button type="submit" className="btn btn-primary btn-lg mt-3">
                        Enviar
                    </button>
                </div>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {Object.keys(fotosPorSector).map((sector) => (
                <div key={sector} className="mt-4">
                    <h2>Fotos del Nivel {sector}</h2>
                    {fotosPorSector[sector].map((fotoSet, setIndex) => (
                        <div key={setIndex} className="mb-3">
                            <p>{fotoSet.fecha}</p>
                            {fotoSet.fotos.map((foto, index) => (
                                <img
                                    key={index}
                                    src={foto.url}
                                    className="img-fluid"
                                    alt={`Foto ${index}`}
                                    width="50%"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Fotos;
