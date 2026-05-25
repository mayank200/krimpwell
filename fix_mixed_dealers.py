import os
import hashlib
import shutil

def get_file_hash(filepath):
    with open(filepath, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()

dealers_dir = 'public/dealers'
products_dir = 'public/products'

# Get all MD5 hashes of dealer logos
dealer_hashes = set()
for filename in os.listdir(dealers_dir):
    if filename.endswith('.png'):
        filepath = os.path.join(dealers_dir, filename)
        dealer_hashes.add(get_file_hash(filepath))

print(f"Loaded {len(dealer_hashes)} unique dealer hashes.")

moved_count = 0

# Check all product images
for root, dirs, files in os.walk(products_dir):
    # Only check inside 'product' subfolders
    if os.path.basename(root) == 'product':
        for filename in files:
            if filename.endswith('.png'):
                filepath = os.path.join(root, filename)
                file_hash = get_file_hash(filepath)
                
                # If the image exactly matches a dealer logo
                if file_hash in dealer_hashes:
                    # Move it to the sibling 'supplier' directory
                    supplier_dir = os.path.join(os.path.dirname(root), 'supplier')
                    os.makedirs(supplier_dir, exist_ok=True)
                    
                    new_filepath = os.path.join(supplier_dir, filename)
                    
                    # Avoid overwriting existing supplier files with the same name
                    counter = 1
                    original_name, ext = os.path.splitext(filename)
                    final_filepath = new_filepath
                    while os.path.exists(final_filepath):
                        final_filepath = os.path.join(supplier_dir, f"{original_name}_{counter}{ext}")
                        counter += 1
                        
                    shutil.move(filepath, final_filepath)
                    print(f"Moved dealer logo from {filepath} to {final_filepath}")
                    moved_count += 1

print(f"Total incorrectly placed logos moved: {moved_count}")
