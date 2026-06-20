'use client';

import { useState, useEffect, useRef } from 'react';

export default function CronometroRolex() {
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tiemposGuardados, setTiemposGuardados] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    let intervalo;
    if (activo) {
      intervalo = setInterval(() => {
        setTiempo(t => t + 10);
      }, 10);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  useEffect(() => {
    if (activo && audioRef.current) {
      audioRef.current.currentTime = 20;
      audioRef.current.play().catch(err => console.log('Error al reproducir:', err));
    } else if (!activo && audioRef.current) {
      audioRef.current.pause();
    }
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      padding: '2rem',
      fontFamily: 'serif'
    }}>
      <audio 
        ref={audioRef} 
        src="/Daddy%20Yankee%20-%20Llegamos%20A%20La%20Disco%20(Video%20Oficial).mp3"
        loop
      />

      <h1 style={{
        color: '#d4af37',
        fontSize: '32px',
        marginBottom: '2rem',
        textAlign: 'center',
        letterSpacing: '3px',
        textShadow: '0 2px 10px rgba(212, 175, 55, 0.5)'
      }}>
        ⏱️ CRONÓMETRO ROLEX
      </h1>

      <div style={{
        position: 'relative',
        width: '360px',
        height: '360px',
        margin: '0 auto 2rem',
        background: 'radial-gradient(circle at 30% 30%, #f0f0f0, #d0d0d0)',
        borderRadius: '50%',
        border: '12px solid #d4af37',
        boxShadow: `
          inset 0 2px 5px rgba(255, 255, 255, 0.5),
          inset 0 -2px 5px rgba(0, 0, 0, 0.3),
          0 8px 20px rgba(212, 175, 55, 0.4),
          0 0 30px rgba(212, 175, 55, 0.2)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {[12, 3, 6, 9].map((num) => {
          const angle = (num === 12 ? 0 : num === 3 ? 90 : num === 6 ? 180 : 270) * Math.PI / 180;
          const x = 130 * Math.sin(angle);
          const y = -130 * Math.cos(angle);
          
          return (
            <div
              key={num}
              style={{
                position: 'absolute',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              {num}
            </div>
          );
        })}

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCv1GlEaPm9120yR10Pa6qjerFRjcqT6siew&s"
          alt="Persona"
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: '3px solid #d4af37',
            objectFit: 'cover',
            zIndex: 5,
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)'
          }}
        />

        <div style={{
          position: 'absolute',
          bottom: '40px',
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          fontFamily: 'monospace',
          letterSpacing: '2px'
        }}>
          {formatearTiempo(tiempo)}
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActivo(!activo)}
          style={{
            padding: '14px 32px',
            fontSize: '15px',
            fontWeight: '700',
            backgroundColor: activo ? '#e74c3c' : '#2ecc71',
            color: 'white',
            border: '2px solid #d4af37',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
            letterSpacing: '1px'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {activo ? '⏸ PAUSAR' : '▶ INICIAR'}
        </button>

        <button
          onClick={reiniciar}
          style={{
            padding: '14px 32px',
            fontSize: '15px',
            fontWeight: '700',
            backgroundColor: '#34495e',
            color: '#d4af37',
            border: '2px solid #d4af37',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
            letterSpacing: '1px'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          🔄 REINICIAR
        </button>

        <button
          onClick={guardarTiempo}
          style={{
            padding: '14px 32px',
            fontSize: '15px',
            fontWeight: '700',
            backgroundColor: '#3498db',
            color: 'white',
            border: '2px solid #d4af37',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
            letterSpacing: '1px'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          💾 GUARDAR
        </button>
      </div>

      {tiemposGuardados.length > 0 && (
        <div style={{
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '2px solid #d4af37',
          maxWidth: '500px',
          width: '100%'
        }}>
          <h3 style={{
            marginTop: 0,
            marginBottom: '1rem',
            color: '#d4af37',
            fontSize: '18px',
            letterSpacing: '1px'
          }}>
            ⏱️ TIEMPOS GUARDADOS ({tiemposGuardados.length})
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: '220px',
            overflowY: 'auto'
          }}>
            {tiemposGuardados.map((t, index) => (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  borderRadius: '8px',
                  border: '1px solid #d4af37',
                  fontSize: '14px'
                }}
              >
                <span style={{ color: '#d4af37' }}>Vuelta {index + 1}</span>
                <span style={{
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  color: '#d4af37',
                  letterSpacing: '1px'
                }}>
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
                padding: '10px',
                fontSize: '13px',
                fontWeight: '700',
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                color: '#fff',
                border: '1px solid #d4af37',
                borderRadius: '6px',
                cursor: 'pointer',
                letterSpacing: '1px'
              }}
            >
              🗑️ LIMPIAR HISTORIAL
            </button>
          )}
        </div>
      )}

      <div style={{
        textAlign: 'center',
        fontSize: '12px',
        color: '#d4af37',
        marginTop: '2rem',
        letterSpacing: '1px'
      }}>
        ✨ CRONÓMETRO DE LUJO ✨
      </div>
    </div>
  );
}
