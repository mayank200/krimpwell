import fitz
import os

pdf_path = "PPT.pdf"
out_dir = "public/images"

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

doc = fitz.open(pdf_path)

# Extract dealers (page 3, 0-indexed 2)
# Extract products (pages 4 to 23, 0-indexed 3 to 22)
page_indices = [2] + list(range(3, 23))

for i in page_indices:
    page = doc.load_page(i)
    pix = page.get_pixmap(dpi=150)
    
    if i == 2:
        name = "dealers"
    else:
        # try to extract a clean name from the page text
        text = page.get_text("text").strip().split('\n')[0]
        # clean the text to be a valid filename
        import re
        clean_text = re.sub(r'[^\w\s-]', '', text).strip()
        clean_text = re.sub(r'[-\s]+', '-', clean_text).lower()
        if not clean_text:
            clean_text = f"product_{i+1}"
        # Some pages have "CONTROL PANEL CONTD" at the top which might pollute name
        if "control-panel-contd" in clean_text:
             text = page.get_text("text").strip().split('\n')[1]
             clean_text = re.sub(r'[^\w\s-]', '', text).strip()
             clean_text = re.sub(r'[-\s]+', '-', clean_text).lower()
        name = clean_text

    out_path = os.path.join(out_dir, f"{name}.png")
    pix.save(out_path)
    print(f"Saved {out_path}")

doc.close()
