import subprocess
import time
import os

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
out_dir = r"c:\Users\vaish\portfolio\screenshots"
base_url = "http://127.0.0.1:5500/index.html"

os.makedirs(out_dir, exist_ok=True)

shots = [
    ("01-desktop-hero.png", f"{base_url}?theme=light&instant=true", "1280,850"),
    ("02-projects-filtering.png", f"{base_url}?theme=light&instant=true&focus=projects&category=frontend", "1280,880"),
    ("03-projects-search.png", f"{base_url}?theme=light&instant=true&focus=projects&search=React", "1280,880"),
    ("04-projects-empty-state.png", f"{base_url}?theme=light&instant=true&focus=projects&search=nonexistentquery", "1280,880"),
    ("05-project-modal.png", f"{base_url}?theme=light&instant=true&modal=examace", "1280,920"),
    ("06-contact-validation.png", f"{base_url}?theme=light&instant=true&focus=contact&form=error", "1280,950"),
    ("07-contact-success.png", f"{base_url}?theme=light&instant=true&focus=contact&form=success", "1280,880"),
    ("08-mobile-view.png", f"{base_url}?theme=light&instant=true", "390,844"),
    ("09-dark-mode.png", f"{base_url}?theme=dark&instant=true&focus=projects&category=backend", "1280,880"),
]

for name, url, size in shots:
    out_path = os.path.join(out_dir, name)
    print(f"Capturing {name}...")
    cmd = [
        chrome,
        "--headless=new",
        "--disable-gpu",
        f"--window-size={size}",
        f"--screenshot={out_path}",
        url
    ]
    subprocess.run(cmd, check=True)
    time.sleep(0.5)

print("All screenshots successfully captured!")
