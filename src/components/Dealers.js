import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import styles from './Dealers.module.css';

export default function Dealers() {
  const dealersDir = path.join(process.cwd(), 'public', 'dealers');
  let dealerImages = [];
  
  try {
    const files = fs.readdirSync(dealersDir);
    dealerImages = files.filter(file => file.endsWith('.png'));
  } catch (error) {
    console.error("Error reading dealers directory:", error);
  }

  // Duplicate the array to create a seamless infinite loop
  const displayImages = [...dealerImages, ...dealerImages];

  return (
    <section className={styles.dealersSection} id="dealers">
      <div className="container">
        <h2 className="section-title">Our Authorized Brands</h2>
        <p className={styles.subtitle}>Trusted partners offering world-class industrial electrical products.</p>
        
        <div className={styles.marqueeContainer}>
          <div className="marquee">
            <div className="marquee-content">
              {displayImages.map((image, index) => (
                <div key={index} className={styles.logoWrapper}>
                  <Image
                    src={`/dealers/${image}`}
                    alt={`Dealer ${index}`}
                    width={180}
                    height={100}
                    style={{ objectFit: 'contain' }}
                    className={styles.dealerLogo}
                  />
                </div>
              ))}
            </div>
            {/* Additional content track for smoother infinite looping on wide screens */}
            <div className="marquee-content" aria-hidden="true">
              {displayImages.map((image, index) => (
                <div key={`dup-${index}`} className={styles.logoWrapper}>
                  <Image
                    src={`/dealers/${image}`}
                    alt={`Dealer ${index}`}
                    width={180}
                    height={100}
                    style={{ objectFit: 'contain' }}
                    className={styles.dealerLogo}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
