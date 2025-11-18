#!/bin/bash
sudo apt update
sudo apt -y install nginx

echo "Downloding angular app"
cd /tmp/
curl https://raw.githubusercontent.com/yoann2968/enib-cloud/refs/heads/main/aws/web/bplace.tar --output bplace.tar
tar xvf bplace.tar
sudo cp dist/*  /var/www/html/

curl https://raw.githubusercontent.com/yoann2968/enib-cloud/refs/heads/main/aws/web/nginx.conf --output nginx.conf
sudo cp nginx.conf /etc/nginx/sites-available/default
sudo chmod 774 /etc/nginx/sites-available/default
sudo systemctl restart nginx.service


echo "Web app started"