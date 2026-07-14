import React, { useState } from 'react';
// Importamos directamente los datos iniciales desde el archivo JSON
import datosIniciales from './contactos.json';

// Importamos los componentes reciclables
import FormularioContacto from './components/FormularioContacto';
import Buscador from './components/Buscador';
import ListaContactos from './components/ListaContactos';

function App() {
  // Estado principal que guarda el array de todos los contactos
  const [contactos, setContactos] = useState(datosIniciales);

  // Estados independientes para controlar cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  // Estado para guardar el texto de error de validación
  const [error, setError] = useState('');

  // Estado que guarda el id del contacto que se está editando (o null si no hay ninguno)
  const [idEnEdicion, setIdEnEdicion] = useState(null);

  // Estado para controlar el texto escrito en la barra de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Función manejadora para procesar el envío del formulario (Guardar o Actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación 1: Verificar que ningún campo esté vacío
    if (nombre.trim() === '' || correo.trim() === '' || telefono.trim() === '') {
      setError('Todos los campos son obligatorios y no deben quedar vacíos.');
      return;
    }

    // Validación 2: Formato del correo electrónico usando una expresión regular sencilla
  // Validación arcaica y fácil de explicar: que contenga '@' y '.'
if (!correo.includes('@') || !correo.includes('.')) {
  setError('El formato del correo electrónico es inválido.');
  return;
}

    // Validación 3: El teléfono no debe contener letras (usando isNaN)
    if (isNaN(telefono.trim())) {
      setError('El número de teléfono solo debe contener dígitos (no letras).');
      return;
    }

    // Si todo es correcto, limpiamos el estado de error
    setError('');

    // Verificamos si estamos en modo edición o registro
    if (idEnEdicion !== null) {
      // Edición: Reemplazamos el contacto modificado buscando por su id con .map()
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
      setIdEnEdicion(null); // Apagamos el modo de edición
    } else {
      // Registro: Creamos el nuevo objeto de contacto y generamos un id único con Date.now()
      const nuevoContacto = {
        id: Date.now(),
        nombre: nombre.trim(),
        correo: correo.trim(),
        telefono: telefono.trim(),
      };
      // Agregamos el nuevo contacto al array original
      setContactos([...contactos, nuevoContacto]);
    }

    // Limpiamos los inputs del formulario al finalizar
    setNombre('');
    setCorreo('');
    setTelefono('');
  };

  // Función para rellenar el formulario con los datos del contacto que se desea editar
  const prepararEdicion = (contacto) => {
    setIdEnEdicion(contacto.id);
    setNombre(contacto.nombre);
    setCorreo(contacto.correo);
    setTelefono(contacto.telefono);
    setError('');
  };

  // Función para cancelar la edición y limpiar el formulario
  const cancelarEdicion = () => {
    setIdEnEdicion(null);
    setNombre('');
    setCorreo('');
    setTelefono('');
    setError('');
  };

  // Función para eliminar un contacto por su id con confirmación de ventana nativa
  const eliminarContacto = (id) => {
    const confirmacion = window.confirm('¿Realmente deseas eliminar este contacto?');
    if (confirmacion) {
      // Filtramos la lista para conservar solo los contactos cuyo id no sea el buscado
      const listaFiltrada = contactos.filter((contacto) => contacto.id !== id);
      setContactos(listaFiltrada);

      // Si el contacto que estamos borrando estaba cargado en el formulario, limpiamos el formulario
      if (idEnEdicion === id) {
        cancelarEdicion();
      }
    }
  };

  // Búsqueda en tiempo real: Se filtra la lista original de contactos directamente en el cuerpo del render
  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor">
      <h1>Agenda de Contactos</h1>

      <div className="distribucion-columnas">
        <div className="columna-formulario">
          {/* Componente del formulario de contactos */}
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
          {/* Componente del buscador */}
          <Buscador
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />

          {/* Componente del listado de contactos filtrados */}
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
