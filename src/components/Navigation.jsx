import styles from './Navigation.module.css';

function Navigation({ currentPage, onPageChange }) {
  const pages = [
    { id: 'characters', label: '👥 Personagens', icon: '👥' },
    { id: 'planets', label: '🌍 Planetas', icon: '🌍' },
  ];

  return (
    <nav className={styles.navigation}>
      {pages.map((page) => (
        <button
          key={page.id}
          className={`${styles.navButton} ${currentPage === page.id ? styles.active : ''}`}
          onClick={() => onPageChange(page.id)}
        >
          {page.label}
        </button>
      ))}
    </nav>
  );
}

export default Navigation;
