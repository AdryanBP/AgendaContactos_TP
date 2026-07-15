import React from 'react';
function Buscador({ busqueda, setBusqueda }) {
  return (
    <div>
      <h2>Buscar Contacto</h2>
      <input
        type="text"
        className="input-buscar"
        placeholder="Escribe un nombre para filtrar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}

export default Buscador;
