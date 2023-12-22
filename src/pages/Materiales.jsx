import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { format, parseISO } from "date-fns";

function Materiales() {
  const [remitos, setRemitos] = useState([]);

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
      } catch (error) {
        console.error("Error al cargar remitos:", error);
      }
    };

    fetchRemitos();
  }, []);

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd-MM-yy");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Materiales Remitidos</h2>

      {remitos.map((remito) => (
        <div key={remito.id}>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="mb-1"
          >
            <div
              style={{ width: "20%" }}
              className=" text-center border border-primary rounded card"
            >
              <strong style={{ fontSize: "14px" }} className="text-warning">
                {formatDate(remito.fecha)}
              </strong>
            </div>
            <div style={{ width: "80%" }}>
              <ul className="list-group">
                {remito.items.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <strong>{item.cantidad}</strong> - {item.descripcion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Materiales;
