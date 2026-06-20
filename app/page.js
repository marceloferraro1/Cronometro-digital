'use client';

import { useState, useEffect } from 'react';

export default function Cronometro() {
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tiemposGuardados, setTiemposGuardados] = useState([]);

  useEffect(() => {
    let intervalo;
    if (activo) {
      intervalo = setInterval(() => {
        setTiempo(t => t + 10);
      }, 10);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  const formatearTiempo = (ms) => {
    const totalSegundos = Math.floor(ms / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;
    const milisegundos = Math.floor((ms % 1000) / 10);

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}.${pad(milisegundos)}`;
  };

  const guardarTiempo = () => {
    const nuevoTiempo = {
      id: Date.now(),
      valor: tiempo,
      formato: formatearTiempo(tiempo)
    };
    setTiemposGuardados([...tiemposGuardados, nuevoTiempo]);
  };

  const reiniciar = () => {
    setTiempo(0);
    setActivo(false);
  };

  const limpiarHistorial = () => {
    setTiemposGuardados([]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginTop: 0,
          marginBottom: '2rem',
          color: '#333',
          fontSize: '28px'
        }}>
          ⏱️ Cronómetro Digital
        </h1>

        <div style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{
            fontSize: '56px',
            fontWeight: '600',
            fontFamily: 'monospace',
            color: '#1a1a1a',
            letterSpacing: '4px',
            lineHeight: '1.2'
          }}>
            {formatearTiempo(tiempo)}
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActivo(!activo)}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              backgroundColor: activo ? '#ef4444' : '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {activo ? '⏸ Pausar' : '▶ Iniciar'}
          </button>

          <button
            onClick={reiniciar}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🔄 Reiniciar
          </button>

          <button
            onClick={guardarTiempo}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            💾 Guardar
          </button>
        </div>

        {tiemposGuardados.length > 0 && (
          <div style={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{
              marginTop: 0,
              marginBottom: '1rem',
              color: '#333',
              fontSize: '16px'
            }}>
              Tiempos Guardados ({tiemposGuardados.length})
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {tiemposGuardados.map((t, index) => (
                <div
                  key={t.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0',
                    fontSize: '14px'
                  }}
                >
                  <span style={{ color: '#666' }}>Vuelta {index + 1}</span>
                  <span style={{ fontWeight: '600', fontFamily: 'monospace', color: '#1a1a1a' }}>
                    {t.formato}
                  </span>
                </div>
              ))}
            </div>
            {tiemposGuardados.length > 0 && (
              <button
                onClick={limpiarHistorial}
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  border: '1px solid #fca5a5',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                🗑️ Limpiar Historial
              </button>
            )}
          </div>
        )}

        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#999',
          marginTop: '1rem'
        }}>
          Precisión: centésimas de segundo
        </div>
      </div>
    </div>
  );
}
