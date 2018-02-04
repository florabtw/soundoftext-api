#! /bin/bash
# Run this on host server to install dependencies, setup nginx

# Don't run as sudo!
if [ "$EUID" -eq 0 ]; then
  echo "Must not run as sudo!"
  exit 1
fi

# GPG Keys

## Mongo
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

# Software Dependencies

sudo apt-get update

sudo apt-get install \
  nginx              \
  mongodb-org        \
  -y

## NVM / Node

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts

## Node Dependencies

npm install -g yarn
npm install -g pm2

# PM2 Setup

STARTUP=$(pm2 startup systemd | tail -1)
eval $STARTUP

# MongoDB

sudo service mongod start
systemctl enable mongod.service

# Firewall Setup (DigitalOcean Specific)

sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Deployment Setup

cd ~

[[ -d Deployment ]] || mkdir Deployment

sudo bash -c "cat > /etc/nginx/sites-available/api.soundoftext.com" <<"EOF"
server {
  listen 80;
  listen [::]:80;

  server_name api.soundoftext.com;

  location / {
    proxy_pass http://localhost:9000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
EOF

sudo ln -s /etc/nginx/sites-available/api.soundoftext.com /etc/nginx/sites-enabled/
sudo service nginx reload
