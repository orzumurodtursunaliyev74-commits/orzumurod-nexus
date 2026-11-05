ORZUMUROD NEXUS — static responsive portfolio
Files: index.html, style.css, script.js, nexus-visual.png (optional concept art)
Mobile-first responsive layout. The terminal and Security Lab are simulations only; no real shell commands, port scans, or attacks are executed.
SHA-256 requires a secure context (HTTPS or localhost) in browsers. Clipboard may require browser permission.
Install on Ubuntu/Nginx:
1) Upload ZIP to /tmp/ORZUMUROD_NEXUS.zip
2) sudo apt install unzip -y
3) sudo mkdir -p /var/www/orzu-nexus
4) sudo unzip -o /tmp/ORZUMUROD_NEXUS.zip -d /var/www/orzu-nexus
5) Test locally: curl -I http://127.0.0.1
To switch existing site after backing it up:
sudo cp -a /var/www/html /var/www/html.backup
sudo cp -a /var/www/orzu-nexus/. /var/www/html/
sudo nginx -t && sudo systemctl reload nginx
