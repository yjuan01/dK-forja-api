import { useState, useEffect } from 'react';
import { getCharacterById } from '../api/api';
import styles from './CharacterDetail.module.css';

function CharacterDetail({ characterId, onBack }) {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCharacterDetail();
    }, [characterId]);

    const fetchCharacterDetail = async () => {
        try {
            setLoading(true);
            const data = await getCharacterById(characterId);
            setCharacter(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar detalhes do personagem');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Carregando...</div>;
    }

    if (error) {
        return (
            <div className={styles.error}>
                <p>{error}</p>
                <button onClick={onBack}>Voltar</button>
            </div>
        );
    }

    if (!character) {
        return (
            <div className={styles.error}>
                <p>Personagem não encontrado</p>
                <button onClick={onBack}>Voltar</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={onBack}>
                ← Voltar
            </button>

            <div className={styles.detailContent}>
                <div className={styles.imageSection}>
                    <img
                        src={character.image}
                        alt={character.name}
                        className={styles.characterImage}
                    />
                </div>

                <div className={styles.infoSection}>
                    <h1>{character.name}</h1>

                    <div className={styles.stats}>
                        {character.ki && (
                            <div className={styles.stat}>
                                <strong>Ki:</strong> <span>{character.ki}</span>
                            </div>
                        )}
                        {character.maxKi && (
                            <div className={styles.stat}>
                                <strong>Ki Máximo:</strong> <span>{character.maxKi}</span>
                            </div>
                        )}
                        {character.race && (
                            <div className={styles.stat}>
                                <strong>Raça:</strong> <span>{character.race}</span>
                            </div>
                        )}
                        {character.gender && (
                            <div className={styles.stat}>
                                <strong>Gênero:</strong> <span>{character.gender}</span>
                            </div>
                        )}
                        {character.affiliation && (
                            <div className={styles.stat}>
                                <strong>Afiliação:</strong> <span>{character.affiliation}</span>
                            </div>
                        )}
                    </div>

                    {character.description && (
                        <div className={styles.description}>
                            <h3>Descrição</h3>
                            <p>{character.description}</p>
                        </div>
                    )}

                    {character.originPlanet && (
                        <div className={styles.planet}>
                            <h3>Planeta de Origem</h3>
                            <p>{character.originPlanet.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CharacterDetail;
