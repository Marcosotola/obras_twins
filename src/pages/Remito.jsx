import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { db } from '../firebase';

const Remito = () => {
  const [fecha, setFecha] = useState('');
  const [items, setItems] = useState([{ cantidad: '', descripcion: '' }]);
  const signatureRef = useRef();
  const [, forceUpdate] = useState();

  const handleFechaChange = (e) => setFecha(e.target.value);

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    setItems(updatedItems);
  };

  const handleFirmaClear = () => {
    signatureRef.current.clear();
  };

  const handleItemAgregar = () => agregarItem();

  const agregarItem = () => setItems([...items, { cantidad: '', descripcion: '' }]);

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
      // Obtener la imagen de la firma
      const firmaImage = signatureRef.current.toDataURL();

      // Guardar en Firebase Firestore
      const remitoData = { fecha, items, firma: firmaImage };
      const remitosCollection = db.collection('remitos');

      await remitosCollection.add(remitoData);

      console.log('Remito enviado correctamente!');

      // Limpiar campos del formulario después de enviar
      setFecha('');
      setItems([{ cantidad: '', descripcion: '' }]);
      signatureRef.current.clear();
    } catch (error) {
      console.error('Error al enviar el remito:', error);
    }
  };

  return (
    <form className="container mt-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
      <div className="form-group">
        <label>
          Fecha:
          <input className="form-control" type="date" value={fecha} onChange={handleFechaChange} required />
        </label>
      </div>

      <h3>Items:</h3>
      {items.map((item, index) => (
        <div className="form-group" key={index}>
          <label>
            Cantidad:
            <input
              className="form-control"
              type="text"
              value={item.cantidad}
              onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)}
            />
          </label>

          <label>
            Descripción:
            <input
              className="form-control"
              type="text"
              value={item.descripcion}
              onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)}
            />
          </label>

          <button className="btn btn-danger" type="button" onClick={() => eliminarItem(index)}>
            Eliminar
          </button>
        </div>
      ))}

      <button className="btn btn-primary" type="button" onClick={handleItemAgregar}>
        Agregar Item
      </button>

      <div className="form-group">
        <label>
          Firma:
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{ width: 500, height: 200, className: 'signatureCanvas form-control' }}
            onEnd={handleCanvasEnd}
          />
          <button className="btn btn-warning mt-2" type="button" onClick={handleFirmaClear}>
            Limpiar Firma
          </button>
        </label>
      </div>

      <button className="btn btn-success" type="submit">
        Enviar
      </button>
    </form>
  );
};

export default Remito;




