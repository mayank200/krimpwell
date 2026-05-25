import styles from './Contact.module.css';

export default function Contact() {
  return (
    <footer className={styles.contactSection} id="contact">
      <div className="container">
        <div className={styles.contactGrid}>
          
          <div className={styles.companyInfo}>
            <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Krimpwell Electricals</h2>
            <p style={{opacity: 0.8, marginBottom: '2rem'}}>A House of Industrial Electricals</p>
            <div>
              <p style={{fontWeight: 'bold'}}>PAWAN BAGRODIA</p>
              <p style={{opacity: 0.8, fontSize: '0.9rem'}}>(PROPRIETOR)</p>
            </div>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.icon}>📍</span>
              <div>
                <h4>Address</h4>
                <p>#611, 1ST FLOOR, MARUTHI PLAZA,<br/>
                OPP. KHALEEL BUILDING, CHICKPET.<br/>
                BANGALORE - 560 053.</p>
              </div>
            </div>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.icon}>📞</span>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+918022876028">+91 - 80 - 22876028</a></p>
                <p><a href="tel:+918041222006">+91 - 80 - 41222006</a></p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <span className={styles.icon}>📱</span>
              <div>
                <h4>Mobile</h4>
                <p><a href="tel:+919341232459">+91 - 9341232459</a></p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.icon}>✉️</span>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:krimpwell@airtelmail.in">krimpwell@airtelmail.in</a></p>
              </div>
            </div>
          </div>

        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Krimpwell Electricals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
