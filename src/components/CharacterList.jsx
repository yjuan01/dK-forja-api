import { useState, useEffect } from 'react';
import { getCharacters } from '../api/api';
import styles from './CharacterList.module.css';

function CharacterList({ onSelectCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const data = await getCharacters(50);
      setCharacters(data.items || []);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar personagens');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>Carregando personagens...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={fetchCharacters}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Buscar personagens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.characterGrid}>
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            className={styles.characterCard}
          >
            <img
              src={character.image}
              alt={character.name}
              className={styles.characterImage}
            />
            <h3>{character.name}</h3>
            <p className={styles.race}>{character.race}</p>
          </div>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className={styles.noResults}>
          Nenhum personagem encontrado com "{searchTerm}"
        </div>
      )}
    </div>
  );
}

export default CharacterList;
