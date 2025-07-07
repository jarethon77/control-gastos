import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [gastos, setGastos] = useState([]);
  const [nuevoGasto, setNuevoGasto] = useState({
    descripcion: '',
    monto: '',
    categoria: '',
  });

  useEffect(() => {
    obtenerGastos();
  }, []);

  const obtenerGastos = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/gastos`);
      console.log('🧪 Respuesta del backend:', res.data);
      // Si tu backend devuelve un array directamente:
      setGastos(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error al obtener gastos:', error);
    }
  };

  const registrarGasto = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/gastos`, nuevoGasto);
      setNuevoGasto({ descripcion: '', monto: '', categoria: '' });
      obtenerGastos();
    } catch (error) {
      console.error('Error al registrar gasto:', error);
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Control de Gastos</h1>

      <form onSubmit={registrarGasto} className="formulario">
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoGasto.descripcion}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, descripcion: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Monto"
          value={nuevoGasto.monto}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, monto: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Categoría"
          value={nuevoGasto.categoria}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, categoria: e.target.value })}
          required
        />
        <button type="submit">Agregar gasto</button>
      </form>

      <h2>📋 Lista de Gastos</h2>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(gastos) && gastos.length > 0 ? (
            gastos.map((gasto, index) => (
              <tr key={index}>
                <td>{gasto.descripcion}</td>
                <td>S/. {parseFloat(gasto.monto).toFixed(2)}</td>
                <td>{gasto.categoria}</td>
                <td>{new Date(gasto.fecha).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay gastos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
