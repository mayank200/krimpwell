"use client";

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled || menuOpen ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <a href="#" onClick={closeMenu}>KRIMPWELL</a>
        </div>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          title="Toggle day / night mode"
        >
          <span className={styles.knob}>
            <span className={styles.iconSun}>☀️</span>
            <span className={styles.iconMoon}>🌙</span>
          </span>
        </button>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} />
        </button>

        {menuOpen && (
          <div className={styles.backdrop} onClick={closeMenu} aria-hidden="true" />
        )}

        <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#dealers" onClick={closeMenu}>Dealers</a></li>
          <li><a href="#products" onClick={closeMenu}>Products</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
