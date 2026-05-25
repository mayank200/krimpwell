import fitz
import os
import re

pdf_path = r"C:\Users\Mayank\Downloads\PPT.pdf"
dealers_dir = "public/dealers"
products_dir = "public/products"

os.makedirs(products_dir, exist_ok=True)
os.makedirs(dealers_dir, exist_ok=True)

# Recursively remove .png files in the products dir instead of using rmtree
for root, dirs, files in os.walk(products_dir):
    for file in files:
        if file.endswith('.png'):
            try:
                os.remove(os.path.join(root, file))
            except Exception as e:
                pass

doc = fitz.open(pdf_path)

# First, collect all dealer xrefs from page 2 (0-indexed)
dealer_xrefs = set()
if len(doc) > 2:
    for img in doc[2].get_images(full=True):
        dealer_xrefs.add(img[0])

dealer_count = 0
product_count = 0
supplier_count = 0

def get_page_title(page):
    text = page.get_text("text").strip().split('\n')[0]
    clean_text = re.sub(r'[^\w\s-]', '', text).strip()
    clean_text = re.sub(r'[-\s]+', '-', clean_text).lower()
    
    if not clean_text:
        return "untitled"
        
    if "control-panel-contd" in clean_text or "control-panel" in clean_text and len(page.get_text("text").strip().split('\n')) > 1:
        text_lines = page.get_text("text").strip().split('\n')
        if len(text_lines) > 1:
            text = text_lines[1]
            clean_text = re.sub(r'[^\w\s-]', '', text).strip()
            clean_text = re.sub(r'[-\s]+', '-', clean_text).lower()
            
    return clean_text[:50].strip('-')

for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    
    if page_index == 2:
        out_dir = dealers_dir
        prefix = "dealer"
    elif page_index >= 3:
        title = get_page_title(page)
        if not title:
            title = f"page_{page_index+1}"
            
        base_dir = os.path.join(products_dir, title)
        os.makedirs(os.path.join(base_dir, "product"), exist_ok=True)
        os.makedirs(os.path.join(base_dir, "supplier"), exist_ok=True)
    else:
        continue
        
    for img_index, img in enumerate(image_list):
        xref = img[0]
        width = img[2]
        height = img[3]
        
        if width < 30 or height < 30:
            continue
            
        try:
            pix = fitz.Pixmap(doc, xref)
            if pix.n - pix.alpha > 3:
                pix = fitz.Pixmap(fitz.csRGB, pix)
                
            if page_index == 2:
                dealer_count += 1
                filename = f"dealer_{dealer_count}.png"
                current_out_dir = dealers_dir
            else:
                # Decide if product or supplier
                if xref in dealer_xrefs:
                    supplier_count += 1
                    filename = f"supplier_{img_index+1}.png"
                    current_out_dir = os.path.join(base_dir, "supplier")
                else:
                    product_count += 1
                    filename = f"product_{img_index+1}.png"
                    current_out_dir = os.path.join(base_dir, "product")
                
            out_path = os.path.join(current_out_dir, filename)
            
            counter = 1
            original_filename = filename
            while os.path.exists(out_path):
                name, ext = os.path.splitext(original_filename)
                filename = f"{name}_{counter}{ext}"
                out_path = os.path.join(current_out_dir, filename)
                counter += 1
                
            pix.save(out_path)
            pix = None
        except Exception as e:
            print(f"Error extracting image {xref} on page {page_index}: {e}")

print(f"Extracted {dealer_count} dealer images.")
print(f"Extracted {product_count} product images and {supplier_count} supplier logos into subfolders.")
doc.close()
