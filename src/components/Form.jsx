import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";


export const Form = (props) => {

    const initialStateValues = {
        data: "",
        name: "",
        descripcion: ""
    };


    const [values, setValues] = useState(initialStateValues);

    const handleImputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })

    };

    const validarDato = str => {
        if (str !== "") {
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (validarDato(values.data)) {

            toast("ERROR Ingrerse una Fecha", {
                type: "error",
                autoClose: 2500,
                position: "top-center"
            })

        } else {
            props.addOrEditTarea(values);
            setValues({ ...initialStateValues })
        }
    };

    const getTareaById = async (id) => {
        const doc = await db.collection('tareas').doc(id).get();
        setValues({ ...doc.data() })
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...initialStateValues });
        }
        else {
            getTareaById(props.currentId);
        }
        // eslint-disable-next-line
    }, [props.currentId]); 

    return (
        <form className="card card-body p-4" onSubmit={handleSubmit}>
            <div className="form-group input-group p-1">
                <div className="input-group-text bg-light">
                    <i className="material-icons text-primary">event</i>
                </div>
                <input type="date"
                    className="form-control"
                    placeholder="Fecha (DD/MM/AAAA)"
                    name="data"
                    onChange={handleImputChange}
                    value={values.data} />
            </div>

            <div className="form-group input-group p-1">
                <div className="input-group-text bg-light">
                    <i className="material-icons text-primary">create</i>
                </div>
                <input type="text"
                    className="form-control"
                    name="name"
                    placeholder="Tarea"
                    onChange={handleImputChange}
                    value={values.name}
                />

            </div>
            <div className="form-group p-1">
                <textarea name="descripcion" rows="3" className="form-control" placeholder="Descripción" onChange={handleImputChange}
                    value={values.descripcion}></textarea>
            </div>

            <button className="btn btn-primary btn-block m-1">
                {props.currentId === '' ? 'GUARDAR' : 'ACTUALIZAR'}
            </button>
        </form>
    )
};

export default Form;