import React, { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { db } from "../firebase";
import LogoTwins from "../sections/Header/LogoTwins.png";

const Remitos = () => {
  const [remitos, setRemitos] = useState([]);
  const [filteredRemitos, setFilteredRemitos] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [numeroFiltro, setNumeroFiltro] = useState("");

  useEffect(() => {
    const fetchRemitos = async () => {
      try {
        const remitosSnapshot = await db.collection("remitos").orderBy("numero", "asc").get();
        const remitosData = remitosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRemitos(remitosData);
        setFilteredRemitos(remitosData);
      } catch (error) {
        console.error("Error al cargar remitos:", error);
      }
    };

    fetchRemitos();
  }, []);

  // Función para formatear la fecha
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yy");
  }, []);

  // Función para aplicar filtros
  const applyFilters = useCallback(() => {
    let filteredResults = remitos;

    if (fechaFiltro) {
      filteredResults = filteredResults.filter(
        (remito) => formatDate(remito.fecha) === fechaFiltro
      );
    }

    if (numeroFiltro) {
      filteredResults = filteredResults.filter(
        (remito) => remito.numero === numeroFiltro
      );
    }

    setFilteredRemitos(filteredResults);
  }, [fechaFiltro, numeroFiltro, remitos, formatDate]);

  // Manejar cambios en los filtros
  useEffect(() => {
    applyFilters();
  }, [applyFilters, fechaFiltro, numeroFiltro, remitos]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Remitos Materiales Entregados</h2>

      {/* Filtros */}
      <div className="m-2 d-flex">
        <div className="m-2">

        <label className="m-2">Fecha:  </label>
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
</div>
<div className="m-2">
        <label className="m-2">Número:   </label>
        <input
          type="text"
          value={numeroFiltro}
          onChange={(e) => setNumeroFiltro(e.target.value)}
        />
        </div>
      </div>

      {filteredRemitos.map((remito) => (
        <div key={remito.id} className="card mb-4 bg-light">
          <div className="card-body">
            <div className="bg-light rounded d-flex justify-content-between">
              <div>
                <img
                  src={LogoTwins}
                  alt="logo"
                  width="75%"
                  height="50"
                  className="rounded mb-2 "
                />
              </div>
              <h1>R</h1>
              <div>
                <h1>Remito</h1>
                <h6 className="card-title text-primary">
                  Fecha:{" "}
                  <span className="text-info">
                    {formatDate(remito.fecha)}
                  </span>
                </h6>
                <h6 className="card-title text-primary">
                  Número:{" "}
                  <span className="text-success">{remito.numero}</span>
                </h6>
              </div>
            </div>
            <h6 className="text-primary">
              Nombre: <span className="text-warning">{remito.nombre}</span>
            </h6>
            <hr />
            <table className="table">
              <thead>
                <tr className="text-primary">
                  <th scope="col">CANTIDAD</th>
                  <th scope="col">DESCRIPCIÓN</th>
                </tr>
              </thead>
              <tbody className="text-secondary">
                {remito.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.cantidad}</td>
                    <td>{item.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="card-text">Firma:</p>
            <img
              src={remito.firma}
              alt="Firma"
              style={{ maxWidth: "100%" }}
              className="img-fluid rounded text-center"
            />
          </div>
          <p className="text-center">Recibí Conforme</p>
        </div>
      ))}
    </div>
  );
};

export default Remitos;
