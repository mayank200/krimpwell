"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './Products.module.css';

const MOBILE_INITIAL_COUNT = 6;

export default function ProductsGrid({ categories }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={styles.productGrid}>
        {categories.map((product, index) => {
          const hiddenOnMobile = !expanded && index >= MOBILE_INITIAL_COUNT;
          return (
            <div
              key={product.id}
              className={`${styles.productCard} ${hiddenOnMobile ? styles.mobileCollapsed : ''}`}
            >
              <div className={styles.productImageWrapper}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {categories.length > MOBILE_INITIAL_COUNT && (
        <div className={styles.showMoreWrapper}>
          <button
            type="button"
            className={styles.showMoreBtn}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded
              ? 'Show Less ↑'
              : `View All ${categories.length} Categories ↓`}
          </button>
        </div>
      )}
    </>
  );
}
