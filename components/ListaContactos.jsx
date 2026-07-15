import React from 'react';
import TarjetaContacto from './TarjetaContacto';

function ListaContactos({ contactos, prepararEdicion, eliminarContacto }) {
  return (
    <div className="lista-contactos">
      <h2>Mis Contactos ({contactos.length})</h2>
      
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
