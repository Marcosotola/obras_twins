import React, { useEffect, useState, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { db } from "../firebase";
import LogoTwins from "../sections/Header/LogoTwins.png";
// eslint-disable-next-line
import html2pdf from 'html2pdf.js';

const Remitos = () => {
  const [remitos, setRemitos] = useState([]);
  const [filteredRemitos, setFilteredRemitos] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [numeroFiltro, setNumeroFiltro] = useState("");

  useEffect(() => {
    const fetchRemitos = async () => {
      try {
        const remitosSnapshot = await db
          .collection("remitos")
          .orderBy("numero", "asc")
          .get();
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

  const formatDate = useCallback((dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd-MM-yy");
  }, []);

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

  useEffect(() => {
    applyFilters();
  }, [applyFilters, fechaFiltro, numeroFiltro, remitos]);

  const exportRemitoToPDF = (remito) => {
    const element = document.getElementById(`remito-${remito.id}`);

    html2pdf(element, {
      margin: 10,
      filename: `remito_${remito.numero}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Remitos Materiales Entregados</h2>
      <div className="m-2">
        <div className="m-2">
          <label className="m-2">Fecha: </label>
          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
          />
        </div>
        <div className="m-2">
          <label className="m-2">Número: </label>
          <input
            type="text"
            value={numeroFiltro}
            onChange={(e) => setNumeroFiltro(e.target.value)}
          />
        </div>
      </div>

      <div id="remits-container">
        {filteredRemitos.map((remito) => (
          <div key={remito.id} id={`remito-${remito.id}`} className="card mb-4 bg-light">
            <div className="card-body ">
              <h1 className="text-center border border-primary">R</h1>
              <div className="bg-light rounded d-flex justify-content-between border border-primary p-2">
                <div>
                  <img
                    src={LogoTwins}
                    alt="logo"
                    width="75%"
                    height="50"
                  />
                </div>
                <div>
                  <h1>Remito</h1>
                  <h6 className="card-title text-primary">
                    Fecha:{" "}
                    <span className="text-info">{formatDate(remito.fecha)}</span>
                  </h6>
                  <h6 className="card-title text-primary">
                    Número: <span className="text-success">000-{remito.numero}</span>
                  </h6>
                </div>
              </div>
              <h6 className="text-primary mt-2">
                Nombre: <span className="text-warning">{remito.nombre}</span>
              </h6>
              <hr />
              <table className="table border border-primary">
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
                className="img-fluid rounded text-center border border-primary"
              />
            </div>
            <p className="text-center">Recibí Conforme</p>
            {/* Botón para descargar PDF de un solo remito */}
            <button className="btn btn-lg bg-secondary" onClick={() => exportRemitoToPDF(remito)}>Descargar Remito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Remitos;


