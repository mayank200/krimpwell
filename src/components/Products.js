import fs from 'fs';
import path from 'path';
import styles from './Products.module.css';
import ProductsGrid from './ProductsGrid';

function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function Products() {
  const productsDir = path.join(process.cwd(), 'public', 'products');
  let productCategories = [];

  try {
    const folders = fs.readdirSync(productsDir);
    
    // Process each folder
    folders.forEach(folder => {
      const folderPath = path.join(productsDir, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        const productSubdir = path.join(folderPath, 'product');
        let mainImage = null;
        
        // Find the first product image to display as the cover
        if (fs.existsSync(productSubdir)) {
          const images = fs.readdirSync(productSubdir).filter(file => file.endsWith('.png'));
          if (images.length > 0) {
            mainImage = `/products/${folder}/product/${images[0]}`;
          }
        }
        
        // If there's no product image, maybe a supplier image?
        if (!mainImage) {
          const supplierSubdir = path.join(folderPath, 'supplier');
          if (fs.existsSync(supplierSubdir)) {
            const images = fs.readdirSync(supplierSubdir).filter(file => file.endsWith('.png'));
            if (images.length > 0) {
              mainImage = `/products/${folder}/supplier/${images[0]}`;
            }
          }
        }

        if (mainImage) {
          productCategories.push({
            id: folder,
            title: toTitleCase(folder),
            image: mainImage
          });
        }
      }
    });
  } catch (error) {
    console.error("Error reading products directory:", error);
  }

  return (
    <section className={styles.productsSection} id="products">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        <ProductsGrid categories={productCategories} />
      </div>
    </section>
  );
}
