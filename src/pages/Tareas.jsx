import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

export const Tareas = () => {
  const initialStateValues = {
    data: "",
    name: "",
    descripcion: "",
  };

  const [values, setValues] = useState(initialStateValues);
  const [tareas, setTareas] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredTareas, setFilteredTareas] = useState(tareas);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateData = (str) => {
    return str === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData(values.data)) {
      toast("ERROR: Ingrese una Fecha", {
        type: "error",
        autoClose: 2500,
        position: "top-center",
      });
    } else {
      addOrEditTarea(values);
      setValues({ ...initialStateValues });
    }
  };

  const addOrEditTarea = async (tareaObject) => {
    try {
      if (currentId === "") {
        await db.collection("tareas").doc().set(tareaObject);

        toast("Tarea Agregada", {
          type: "success",
          autoClose: 1000,
          position: "top-center",
        });
      } else {
        await db.collection("tareas").doc(currentId).update(tareaObject);

        toast("Tarea Actualizada", {
          type: "info",
          autoClose: 1000,
          position: "top-center",
        });
        setCurrentId("");
        setValues(initialStateValues); // Reset the form
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    const filtered = tareas.filter((tarea) =>
      tarea.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTareas(filtered);
  };

  const getTareas = async () => {
    db.collection("tareas")
      .orderBy("data", "asc")
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setTareas(docs);
        setFilteredTareas(docs);
      });
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <>
      <div>
        <div className="col-md-6 mx-auto p-2">
          <h4 className="d-flex justify-content-center p-3">
            Ingresar Tarea Diaria
          </h4>
          <form className="card card-body p-4" onSubmit={handleSubmit}>
            <div className="form-group input-group p-1">
              <div className="input-group-text bg-light">
                <i className="material-icons text-primary">event</i>
              </div>
              <input
                type="date"
                className="form-control"
                placeholder="Fecha (DD/MM/AAAA)"
                name="data"
                onChange={handleInputChange}
                value={values.data}
              />
            </div>

            <div className="form-group input-group p-1">
              <div className="input-group-text bg-light">
                <i className="material-icons text-primary">create</i>
              </div>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Tarea"
                onChange={handleInputChange}
                value={values.name}
              />
            </div>
            <div className="form-group p-1">
              <textarea
                name="descripcion"
                rows="3"
                className="form-control"
                placeholder="Descripción"
                onChange={handleInputChange}
                value={values.descripcion}
              ></textarea>
            </div>

            <button className="btn btn-primary btn-block m-1">
              {currentId === "" ? "GUARDAR" : "ACTUALIZAR"}
            </button>
          </form>
        </div>

        <div className="col-md-8 mx-auto p-2">
          <h4 className="d-flex justify-content-center p-3">
            Reporte de Tareas
          </h4>
          <div className="mb-4 d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar tareas por tema"
              onChange={(e) => handleFilterChange(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleFilterChange(filter)}
            >
              Filtrar
            </button>
            <CSVLink
              data={filteredTareas}
              filename={"tareas.csv"}
              className="btn btn-primary"
            >
              Descargar
            </CSVLink>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tarea</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {filteredTareas.map((tarea) => (
                <tr key={tarea.id}>
                  <td>{tarea.data}</td>
                  <td>{tarea.name}</td>
                  <td>{tarea.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tareas;
