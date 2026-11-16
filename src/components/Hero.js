import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <div className={`${styles.heroContent} fade-in`}>
        <h1 className={styles.title}>Krimpwell Electricals</h1>
        <h2 className={styles.subtitle}>India's Premium House of Industrial Electricals</h2>
        
        <div className={styles.ctaWrapper}>
          <a href="#products" className={styles.ctaButton}>Explore Products</a>
          <a href="#contact" className={`${styles.ctaButton} ${styles.ctaOutline}`}>Contact Us</a>
        </div>
        
        <div className={styles.proprietor}>
          <p><strong>PAWAN BAGRODIA</strong></p>
          <p><small>PROPRIETOR</small></p>
        </div>
      </div>
      <a href="#about" className={styles.scrollDown} aria-label="Scroll to next section">
        ↓
      </a>
    </section>
  );
}
