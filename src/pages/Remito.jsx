import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { db } from "../firebase";

const Remito = () => {
  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [items, setItems] = useState([{ cantidad: "", descripcion: "" }]);
  const signatureRef = useRef();
  const [, forceUpdate] = useState();

  const handleFechaChange = (e) => setFecha(e.target.value);
  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleNumeroChange = (e) => setNumero(e.target.value);

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    setItems(updatedItems);
  };

  const handleFirmaClear = () => {
    signatureRef.current.clear();
  };

  const handleItemAgregar = () => agregarItem();

  const agregarItem = () =>
    setItems([...items, { cantidad: "", descripcion: "" }]);

  const eliminarItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleCanvasEnd = () => {
    forceUpdate((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const firmaImage = signatureRef.current.toDataURL();

      const remitoData = { fecha, nombre, numero, items, firma: firmaImage };
      const remitosCollection = db.collection("remitos");

      await remitosCollection.add(remitoData);

      console.log("Remito enviado correctamente!");

      setFecha("");
      setNombre("");
      setNumero("");
      setItems([{ cantidad: "", descripcion: "" }]);
      signatureRef.current.clear();
    } catch (error) {
      console.error("Error al enviar el remito:", error);
    }
  };

  return (
    <>
    <h1 className="text-center">Cargar Remito</h1>
    <Form
      className="container mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <Form.Group as={Row}>
        <Col sm="8">
          <Form.Control
            type="date"
            value={fecha}
            onChange={handleFechaChange}
            placeholder="Fecha"
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm="8">
          <Form.Control
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Nombre"
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm="8">
          <Form.Control
            type="text"
            value={numero}
            onChange={handleNumeroChange}
            placeholder="Numero"
            required
          />
        </Col>
      </Form.Group>
<hr />
      <h3>Items:</h3>
      {items.map((item, index) => (
        <div className="form-group" key={index}>
          <Form.Group as={Row}>

            <Col sm="3">
              <Form.Control
                type="text"
                value={item.cantidad}
                placeholder="Cantidad"
                onChange={(e) =>
                  handleItemChange(index, "cantidad", e.target.value)
                }
              />
            </Col>

            <Col sm="3">
              <Form.Control
                type="text"
                value={item.descripcion}
                placeholder="Descripcion"
                onChange={(e) =>
                  handleItemChange(index, "descripcion", e.target.value)
                }
              />
            </Col>

            <Col sm="12" className="mt-2 text-center">
              <Button
                variant="danger"
                type="button"
                onClick={() => eliminarItem(index)}
              >
                Eliminar Item
              </Button>
            </Col>
          </Form.Group>
        </div>
      ))}

      <Button
        className="mt-4 mb-3"
        variant="primary"
        type="button"
        onClick={handleItemAgregar}
      >
        Agregar Item
      </Button>
<hr />
      <Form.Group>
        <Form.Label>Firma:</Form.Label>
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            width: 500,
            height: 200,
            className: "signatureCanvas form-control",
          }}
          onEnd={handleCanvasEnd}
        />
        <Button
          variant="warning"
          className="mt-2"
          type="button"
          onClick={handleFirmaClear}
        >
          Limpiar Firma
        </Button>
      </Form.Group>
      <div className="text-center">
        <Button className="btn-lg mt-4 mb-4" variant="success" type="submit">
          Enviar Remito
        </Button>
      </div>
    </Form>
    </>
  );
};

export default Remito;