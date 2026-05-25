import os
import shutil
import fitz

dirs = ['meters', 'plugs-sockets', 'pvc-wires-cables', 'wiring-accessories']

moved_count = 0

for d in dirs:
    product_dir = os.path.join('public/products', d, 'product')
    supplier_dir = os.path.join('public/products', d, 'supplier')
    
    if os.path.exists(product_dir):
        for f in os.listdir(product_dir):
            if f.endswith('.png'):
                img_path = os.path.join(product_dir, f)
                try:
                    pix = fitz.Pixmap(img_path)
                    w, h = pix.width, pix.height
                    ratio = w / h if h > 0 else 0
                    
                    # Heuristic: if it's very wide (ratio > 1.8) or very small (w < 200 and h < 200)
                    if ratio > 1.8 or (w < 200 and h < 200):
                        os.makedirs(supplier_dir, exist_ok=True)
                        
                        new_filepath = os.path.join(supplier_dir, f)
                        counter = 1
                        original_name, ext = os.path.splitext(f)
                        final_filepath = new_filepath
                        while os.path.exists(final_filepath):
                            final_filepath = os.path.join(supplier_dir, f"{original_name}_{counter}{ext}")
                            counter += 1
                            
                        shutil.move(img_path, final_filepath)
                        print(f"Moved likely logo by heuristics: {d} -> {f} ({w}x{h})")
                        moved_count += 1
                except Exception as e:
                    pass

print(f"Total heuristic moves: {moved_count}")
