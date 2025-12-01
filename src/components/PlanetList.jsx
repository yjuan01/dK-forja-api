import { useState, useEffect } from 'react';
import { getPlanets } from '../api/api';
import styles from './PlanetList.module.css';

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      const data = await getPlanets(50);
      setPlanets(data.items || []);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar planetas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>Carregando planetas...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={fetchPlanets}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Buscar planetas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.planetGrid}>
        {filteredPlanets.map((planet) => (
          <div
            key={planet.id}
            className={styles.planetCard}
          >
            <img
              src={planet.image}
              alt={planet.name}
              className={styles.planetImage}
            />
            <h3>{planet.name}</h3>
            {planet.description && (
              <p className={styles.description}>{planet.description}</p>
            )}
          </div>
        ))}
      </div>

      {filteredPlanets.length === 0 && (
        <div className={styles.noResults}>
          Nenhum planeta encontrado com "{searchTerm}"
        </div>
      )}
    </div>
  );
}

export default PlanetList;
