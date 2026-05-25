import os
import hashlib

def remove_duplicates(directory):
    hashes = set()
    duplicates_removed = 0
    
    for filename in sorted(os.listdir(directory)):
        if not filename.endswith('.png'):
            continue
            
        file_path = os.path.join(directory, filename)
        
        with open(file_path, 'rb') as f:
            file_hash = hashlib.md5(f.read()).hexdigest()
            
        if file_hash in hashes:
            print(f"Removing duplicate: {filename}")
            os.remove(file_path)
            duplicates_removed += 1
        else:
            hashes.add(file_hash)
            
    print(f"Total duplicates removed: {duplicates_removed}")

remove_duplicates('public/dealers')
