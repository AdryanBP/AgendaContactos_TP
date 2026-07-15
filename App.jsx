import React, { useState } from 'react';
import datosIniciales from './contactos.json';

import FormularioContacto from './components/FormularioContacto';
import Buscador from './components/Buscador';
import ListaContactos from './components/ListaContactos';

function App() {
  const [contactos, setContactos] = useState(datosIniciales);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const [error, setError] = useState('');

  const [idEnEdicion, setIdEnEdicion] = useState(null);

  const [busqueda, setBusqueda] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || correo.trim() === '' || telefono.trim() === '') {
      setError('Todos los campos son obligatorios y no deben quedar vacíos.');
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      setError('El formato del correo electrónico es inválido.');
      return;
    }

    if (isNaN(telefono.trim())) {
      setError('El número de teléfono solo debe contener dígitos (no letras).');
      return;
    }

    setError('');

    if (idEnEdicion !== null) {
      const listaModificada = contactos.map((contacto) =>
        contacto.id === idEnEdicion
          ? {
              id: idEnEdicion,
              nombre: nombre.trim(),
              correo: correo.trim(),
              telefono: telefono.trim(),
            }
          : contacto
      );
      setContactos(listaModificada);
      setIdEnEdicion(null);
    } else {
      const nuevoContacto = {
        id: Date.now(),
        nombre: nombre.trim(),
        correo: correo.trim(),
        telefono: telefono.trim(),
      };
      setContactos([...contactos, nuevoContacto]);
    }

    setNombre('');
    setCorreo('');
    setTelefono('');
  };

  const prepararEdicion = (contacto) => {
    setIdEnEdicion(contacto.id);
    setNombre(contacto.nombre);
    setCorreo(contacto.correo);
    setTelefono(contacto.telefono);
    setError('');
  };

  const cancelarEdicion = () => {
    setIdEnEdicion(null);
    setNombre('');
    setCorreo('');
    setTelefono('');
    setError('');
  };

  const eliminarContacto = (id) => {
    const confirmacion = window.confirm('¿Realmente deseas eliminar este contacto?');
    if (confirmacion) {
      const listaFiltrada = contactos.filter((contacto) => contacto.id !== id);
      setContactos(listaFiltrada);

      if (idEnEdicion === id) {
        cancelarEdicion();
      }
    }
  };

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor">
      <h1>Agenda de Contactos</h1>

      <div className="distribucion-columnas">
        <div className="columna-formulario">
          <FormularioContacto
            nombre={nombre}
            setNombre={setNombre}
            correo={correo}
            setCorreo={setCorreo}
            telefono={telefono}
            setTelefono={setTelefono}
            idEnEdicion={idEnEdicion}
            handleSubmit={handleSubmit}
            cancelarEdicion={cancelarEdicion}
            error={error}
          />
        </div>

        <div className="columna-listado">
          <Buscador
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />

          <ListaContactos
            contactos={contactosFiltrados}
            prepararEdicion={prepararEdicion}
            eliminarContacto={eliminarContacto}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
