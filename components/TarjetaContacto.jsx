import React from 'react';
function TarjetaContacto({ contacto, prepararEdicion, eliminarContacto }) {
  return (
    <div className="tarjeta-contacto">
      <p><strong>Nombre:</strong> {contacto.nombre}</p>
      <p><strong>Correo:</strong> {contacto.correo}</p>
      <p><strong>Teléfono:</strong> {contacto.telefono}</p>
      <div className="acciones-contacto">
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => prepararEdicion(contacto)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario btn-eliminar"
          onClick={() => eliminarContacto(contacto.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TarjetaContacto;
