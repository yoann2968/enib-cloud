#!/bin/bash
sudo apt update
sudo apt -y install openjdk-11-jdk mariadb-client

sudo mkdir /usr/local/applications
sudo chmod 777 /usr/local/applications
cd /usr/local/applications


echo "Downloding API app"
curl https://gitlab.com/enib1/lab/-/raw/main/aws/api/bplace.jar?inline=false --output bplace.jar
curl https://gitlab.com/enib1/lab/-/raw/main/aws/api/launch.sh?inline=false --output launch.sh
curl https://gitlab.com/enib1/lab/-/raw/main/aws/api/launch.env?inline=false --output launch.env

chmod +x launch.sh
nohup ./launch.sh &


echo "API app created"