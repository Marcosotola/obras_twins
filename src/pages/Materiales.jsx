import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { CSVLink } from "react-csv";


const Materiales = () => {
  const [materiales, setMateriales] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const obtenerMateriales = async () => {
      try {
        const materialesSnapshot = await db.collection("materiales").get();

        const materialesData = materialesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMateriales(materialesData);
      } catch (error) {
        console.error("Error al obtener los materiales:", error);
      }
    };

    obtenerMateriales();
  }, []);

  // Función para filtrar los materiales en función del valor del input
  const filtrarMateriales = () => {
    const materialesFiltrados = materiales.filter((material) =>
      material.descripcion.toLowerCase().includes(input.toLowerCase())
    );
    setMateriales(materialesFiltrados);
  };

  return (
    <>
      <div className="container">
        <h4 className="text-center mt-5 mb-5">
          Lista de Materiales Entregados
        </h4>
        <div className="mb-4">
          <div className="input-group-text gap-2">
            <input
              className="form-control"
              type="text"
              placeholder="Filtrar por descripción"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={filtrarMateriales}
            >
              Filtrar
            </button>
            <CSVLink
              data={materiales}
              filename={"materiales.csv"}
              className="btn btn-primary"
            >
              Descargar
            </CSVLink>

          </div>
        </div>
        <table id="tablaMateriales" className="table table-hover">
          <thead>
            <tr className="table-secondary">
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {materiales.map((material) => (
              <tr key={material.id}>
                <td>{material.fecha}</td>
                <td>{material.cantidad}</td>
                <td>{material.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Materiales;
