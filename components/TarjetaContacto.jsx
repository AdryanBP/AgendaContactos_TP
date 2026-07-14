import React from 'react';

// Componente reciclable para mostrar una tarjeta individual de contacto
function TarjetaContacto({ contacto, prepararEdicion, eliminarContacto }) {
  return (
    <div className="tarjeta-contacto">
      <p><strong>Nombre:</strong> {contacto.nombre}</p>
      <p><strong>Correo:</strong> {contacto.correo}</p>
      <p><strong>Teléfono:</strong> {contacto.telefono}</p>
      
      {/* Botones de acción para cada tarjeta individual */}
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
