import os
import time

def remove_empty_dirs(path):
    removed_any = False
    for root, dirs, files in os.walk(path, topdown=False):
        for dir_name in dirs:
            dir_path = os.path.join(root, dir_name)
            try:
                if not os.listdir(dir_path):
                    os.rmdir(dir_path)
                    print(f"Removed: {dir_path}")
                    removed_any = True
            except PermissionError:
                # Retry once after a brief delay if locked
                time.sleep(0.5)
                try:
                    os.rmdir(dir_path)
                    print(f"Removed on retry: {dir_path}")
                    removed_any = True
                except Exception as e:
                    print(f"Failed to remove {dir_path}: {e}")
            except Exception as e:
                print(f"Failed to remove {dir_path}: {e}")
    return removed_any

# Run multiple times because removing a child dir might make the parent dir empty
while True:
    if not remove_empty_dirs('public/products'):
        break
