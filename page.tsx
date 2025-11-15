'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        fetch(`https://efootball-api.vercel.app/api/search?q=${search}`)
          .then(r => r.json())
          .then(data => setPlayers(data.slice(0, 20)));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const sample = [
    { name: 'Lionel Messi', rating: 94, club: 'Inter Miami', position: 'RW' },
    { name: 'Cristiano Ronaldo', rating: 93, club: 'Al Nassr', position: 'ST' },
    { name: 'Neymar Jr', rating: 91, club: 'Al Hilal', position: 'LW' },
  ];

  const display = search ? players : sample;

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial', background: '#f0f9f0', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#006400', fontSize: '1.8rem', marginBottom: '1rem' }}>
        eFootball Stats BD
      </h1>
      <input
        type="text"
        placeholder="Search player..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '1rem', marginBottom: '1rem',
          borderRadius: '12px', border: '2px solid #006400', fontSize: '1.1rem'
        }}
      />

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        {display.map((p, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '1rem',
            textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              background: '#FFD700', color: 'black', width: '40px', height: '40px',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 0.5rem', fontWeight: 'bold', fontSize: '1.2rem'
            }}>
              {p.rating}
            </div>
            <h3 style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{p.name}</h3>
            <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
              {p.position} • {p.club}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
    }
