import os
import fitz

dirs = ['meters', 'plugs-sockets', 'pvc-wires-cables', 'wiring-accessories']

for d in dirs:
    product_dir = os.path.join('public/products', d, 'product')
    if os.path.exists(product_dir):
        print(f"--- {d} ---")
        for f in os.listdir(product_dir):
            if f.endswith('.png'):
                img_path = os.path.join(product_dir, f)
                try:
                    pix = fitz.Pixmap(img_path)
                    w, h = pix.width, pix.height
                    ratio = w / h if h > 0 else 0
                    print(f"{f}: {w}x{h} (ratio: {ratio:.2f})")
                except Exception as e:
                    print(f"Error reading {f}: {e}")
