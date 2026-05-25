import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.aboutSection} id="about">
      <div className="container">
        <h2 className="section-title">Business Opportunity & Introduction</h2>
        <div className={styles.aboutGrid}>
          
          <div className={`${styles.aboutCard} hover-lift`}>
            <h3>
              <span className={styles.icon}>⚡</span>
              Leading Trading House
            </h3>
            <p>
              We are a leading trading house in Karnataka for various industrial electrical products, specializing in Switchgear related products. We keep a stock of almost all items in this line and cater to all private sector & government sector industries.
            </p>
          </div>

          <div className={`${styles.aboutCard} hover-lift`}>
            <h3>
              <span className={styles.icon}>🏢</span>
              Strategic Location
            </h3>
            <p>
              We have our office & godown at the heart of the city in the electrical market, from where we control all our operations, ensuring prompt delivery and excellent service to all our clients.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
