import React, { useState } from 'react'
import Form from '../components/Form';
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useEffect } from 'react';


export const Tareas = () => {

const scrollToTop = () => {
  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
};

  const [tareas, setTareas] = useState([]);
  const [currentId, setCurrentId] = useState('')
  const addOrEditTarea = async (tareaObject) => {
    try {
      if (currentId === '') {
        await db.collection("tareas").doc().set(tareaObject);

        toast("Tarea Agregada", {
          type: "success",
          autoClose: 1000,
          position: "top-center"
        });
      } 
      
      else {
        await db.collection('tareas').doc(currentId).update(tareaObject);

        toast("Tarea Actualizada", {
          type: "info",
          autoClose: 1000,
          position: "top-center"
        });
        setCurrentId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteTarea = async (id) => {
    if (window.confirm("Desea eliminar la tarea?")) {
      await db.collection("tareas").doc(id).delete();

      toast("Tarea Eliminada", {
        type: "error",
        autoClose: 1000,
        position: "top-center"
      })
    }
  };

  const getTareas = async () => {
    db.collection("tareas").orderBy("data", "asc").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setTareas(docs);
    });
  }


  useEffect(() => {
    getTareas();
  }, []);


  return (
    <>
<div>

        <div className=" col-md-6 mx-auto p-2">
          <h4 className='d-flex justify-content-center p-3 text-primary'>Ingresar Tarea Diaria</h4>
          <Form {...{ addOrEditTarea, currentId, tareas }} />
          </div>
          
        <div className=" col-md-8 mx-auto p-2">
        <h4 className='d-flex justify-content-center p-3 text-primary'>Reporte de Tareas</h4>
          {tareas.map(tarea =>
          //{return <h1> {tarea.name} </h1>}

          
            <div className="card mb-1 text-center" key={tarea.id}>
              <div className="card-body">
                <div className='d-flex justify-content-between'>
                  <h6>{tarea.data}</h6>
                  <h6 className='text-success'>{tarea.name}</h6>
                  <div>
                   
                    <button className='btn'>
                      <i className='material-icons text-danger'
                        onClick={() => onDeleteTarea(tarea.id)}>delete</i>
                    </button>

                    <button className='btn' onClick={scrollToTop}>                                     
                      <i className='material-icons'onClick= {() => setCurrentId(tarea.id) }>edit</i>                       
                    </button>

                  </div>
                </div>
                
                <p className=''>{tarea.descripcion}</p>
              </div>
            </div>

          )}
        </div>
        </div>

    </>
  )
};

export default Tareas;










/*
import React, { useState, useEffect } from 'react';
import Form from './Form';
import { toast } from 'react-toastify';
import { db } from '../firebase';

export const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const addOrEditTarea = async (tareaObject) => {
    try {
      if (currentId === '') {
        await db.collection("tareas").doc().set(tareaObject);

        toast("Tarea Agregada", {
          type: "success",
          autoClose: 1000,
          position: "top-center"
        });
      } 
      else {
        await db.collection('tareas').doc(currentId).update(tareaObject);

        toast("Tarea Actualizada", {
          type: "info",
          autoClose: 1000,
          position: "top-center"
        });
        setCurrentId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteTarea = async (id) => {
    if (window.confirm("Desea eliminar la tarea?")) {
      await db.collection("tareas").doc(id).delete();

      toast("Tarea Eliminada", {
        type: "error",
        autoClose: 1000,
        position: "top-center"
      })
    }
  };

  const getTareas = async () => {
    db.collection("tareas").orderBy("data", "asc").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setTareas(docs);
    });
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <div>
      <div className="col-md-6 mx-auto p-2">
        <h4 className="d-flex justify-content-center p-3 text-primary">Ingresar Tarea Diaria</h4>
        <Form {...{ addOrEditTarea, currentId, tareas }} />
      </div>

      <div className="col-md-8 mx-auto p-2">
        <h4 className="d-flex justify-content-center p-3 text-primary">Reporte de Tareas</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id}>
                <td>{tarea.data}</td>
                <td>{tarea.name}</td>
                <td>{tarea.descripcion}</td>
                <td>
                  <button className="btn" onClick={() => onDeleteTarea(tarea.id)}>
                    <i className="material-icons text-danger">delete</i>
                  </button>
                  <button className="btn" onClick={() => setCurrentId(tarea.id)}>
                    <i className="material-icons">edit</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tareas;

*/