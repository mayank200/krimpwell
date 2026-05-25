import os
import fitz

dealers_dir = 'public/dealers'
dealer_sizes = set()

for f in os.listdir(dealers_dir):
    if f.endswith('.png'):
        try:
            pix = fitz.Pixmap(os.path.join(dealers_dir, f))
            dealer_sizes.add((pix.width, pix.height))
        except:
            pass

dirs = ['meters', 'plugs-sockets', 'pvc-wires-cables', 'wiring-accessories']

for d in dirs:
    product_dir = os.path.join('public/products', d, 'product')
    if os.path.exists(product_dir):
        for f in os.listdir(product_dir):
            if f.endswith('.png'):
                img_path = os.path.join(product_dir, f)
                try:
                    pix = fitz.Pixmap(img_path)
                    if (pix.width, pix.height) in dealer_sizes:
                        print(f"Match found by dimension! {d} -> {f} ({pix.width}x{pix.height})")
                except:
                    pass
