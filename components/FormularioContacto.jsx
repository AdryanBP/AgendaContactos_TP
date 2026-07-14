import React from 'react';

// Componente simple y reciclable para el formulario de contactos
function FormularioContacto({
  nombre,
  setNombre,
  correo,
  setCorreo,
  telefono,
  setTelefono,
  idEnEdicion,
  handleSubmit,
  cancelarEdicion,
  error
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* Título dinámico para saber si estamos registrando o editando */}
      <h2>{idEnEdicion !== null ? 'Editar Contacto' : 'Nuevo Contacto'}</h2>

      <div className="grupo-campo">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Juan Pérez"
        />
      </div>

      <div className="grupo-campo">
        <label>Correo Electrónico:</label>
        <input
          type="text"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ej. juan@correo.com"
        />
      </div>

      <div className="grupo-campo">
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ej. 55512345"
        />
      </div>

      {/* Botón con texto dinámico dependiendo del modo (editar/guardar) */}
      <button type="submit" className="btn">
        {idEnEdicion !== null ? 'Actualizar' : 'Guardar'}
      </button>

      {/* Botón para cancelar la edición si el usuario lo desea */}
      {idEnEdicion !== null && (
        <button type="button" className="btn btn-secundario" onClick={cancelarEdicion}>
          Cancelar Edición
        </button>
      )}

      {/* Mensaje de error si falla alguna validación */}
      {error && <div className="error-mensaje">{error}</div>}
    </form>
  );
}

export default FormularioContacto;
