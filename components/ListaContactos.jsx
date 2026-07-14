import React from 'react';
import TarjetaContacto from './TarjetaContacto';

// Componente reciclable para renderizar el listado de tarjetas de contactos
function ListaContactos({ contactos, prepararEdicion, eliminarContacto }) {
  return (
    <div className="lista-contactos">
      <h2>Mis Contactos ({contactos.length})</h2>
      
      {/* Si no hay contactos, mostramos un mensaje; si hay, los mapeamos usando TarjetaContacto */}
      {contactos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No hay contactos para mostrar</p>
      ) : (
        contactos.map((contacto) => (
          <TarjetaContacto
            key={contacto.id}
            contacto={contacto}
            prepararEdicion={prepararEdicion}
            eliminarContacto={eliminarContacto}
          />
        ))
      )}
    </div>
  );
}

export default ListaContactos;
