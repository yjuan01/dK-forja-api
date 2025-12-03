import { useState } from 'react';
import './App.module.css';
import Navigation from './components/Navigation';
import CharacterList from './components/CharacterList';
import PlanetList from './components/PlanetList';
import CharacterDetail from './components/CharacterDetail';

function App() {
  const [currentPage, setCurrentPage] = useState('characters');
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  return (
    <div className="app">
      <header className="header">
        <h1>🐉 Dragon Ball Wiki</h1>
        <p>Explore os personagens e planetas do universo Dragon Ball</p>
      </header>

      <div className="container">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        
        {selectedCharacterId ? (
          <CharacterDetail
            characterId={selectedCharacterId}
            onBack={() => setSelectedCharacterId(null)}
          />
        ) : (
          <>
            {currentPage === 'characters' && (
              <CharacterList onSelectCharacter={setSelectedCharacterId} />
            )}
            {currentPage === 'planets' && <PlanetList />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
