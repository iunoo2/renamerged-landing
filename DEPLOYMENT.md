# Deployment Guide - Ubuntu Server

Panduan lengkap untuk deploy website Renamerged di Ubuntu Server.

## Prerequisites

- Ubuntu Server 20.04 atau lebih baru
- Akses SSH ke server
- Domain yang sudah diarahkan ke IP server (untuk production)

## 1. Update System & Install Dependencies

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install SSL certificate tool (untuk HTTPS)
sudo apt install -y certbot python3-certbot-nginx

# Verify installations
node --version
npm --version
nginx -v
```

## 2. Clone & Setup Project

```bash
# Clone project (ganti dengan repo kamu)
cd /var/www
sudo mkdir renamerged
sudo chown -R $USER:$USER renamerged
cd renamerged

# Upload files atau clone dari git
# Jika pakai git:
# git clone https://github.com/username/renamerged.git .

# Atau upload manual lewat scp dari local:
# scp -r /path/to/project/* user@server:/var/www/renamerged/

# Install dependencies
npm install

# Setup environment variables
nano .env
```

Edit file `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key-here
```

```bash
# Build project
npm run build
```

## 3. Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/renamerged
```

Paste configuration ini:

```nginx
server {
    listen 80;
    server_name renamerged.id www.renamerged.id;

    root /var/www/renamerged/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/renamerged /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 4. Setup SSL Certificate (HTTPS)

```bash
# Install SSL certificate untuk domain kamu
sudo certbot --nginx -d renamerged.id -d www.renamerged.id

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)

# Auto-renewal sudah disetup otomatis oleh certbot
# Test renewal:
sudo certbot renew --dry-run
```

## 5. Setup Firewall

```bash
# Enable firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable

# Check status
sudo ufw status
```

## 6. Update Website (Deploy Updates)

Setiap kali ada update code:

```bash
cd /var/www/renamerged

# Pull latest changes (jika pakai git)
git pull

# Atau upload files baru via scp

# Install new dependencies (jika ada)
npm install

# Rebuild
npm run build

# Restart Nginx (optional, biasanya tidak perlu)
sudo systemctl restart nginx
```

## 7. Monitoring & Maintenance

```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Check SSL certificate expiry
sudo certbot certificates

# Restart Nginx jika perlu
sudo systemctl restart nginx
```

## Troubleshooting

### Website tidak bisa diakses
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -100 /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### SSL Certificate Error
```bash
# Renew certificate manually
sudo certbot renew --force-renewal

# Restart Nginx
sudo systemctl restart nginx
```

### Permission Issues
```bash
# Fix file permissions
sudo chown -R www-data:www-data /var/www/renamerged/dist
sudo chmod -R 755 /var/www/renamerged/dist
```

## Performance Tips

1. **Enable Nginx Caching**
2. **Use CDN** untuk static assets
3. **Monitor dengan** `htop` dan `netstat`
4. **Setup log rotation** untuk Nginx logs
5. **Regular updates**: `sudo apt update && sudo apt upgrade`

## Security Checklist

- ✅ SSL/HTTPS enabled
- ✅ Firewall configured
- ✅ Regular system updates
- ✅ Nginx security headers
- ✅ File permissions properly set
- ✅ SSH key authentication (disable password login)
- ✅ Regular backups

## Backup Strategy

```bash
# Backup project
tar -czf renamerged-backup-$(date +%Y%m%d).tar.gz /var/www/renamerged

# Backup database (jika ada)
# Supabase sudah auto-backup, tapi bisa export manual juga
```

## Notes

- Build size: ~30MB
- Node.js version: 20.x LTS recommended
- Nginx version: 1.18+ recommended
- Ubuntu version: 20.04+ recommended
