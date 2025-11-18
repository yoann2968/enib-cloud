#!/bin/bash
sudo apt update
sudo apt -y install openjdk-11-jdk mariadb-client

sudo mkdir /usr/local/applications
sudo chmod 777 /usr/local/applications
cd /usr/local/applications


echo "Downloding API app"
curl https://raw.githubusercontent.com/yoann2968/enib-cloud/refs/heads/main/aws/api/bplace.jar --output bplace.jar
curl https://raw.githubusercontent.com/yoann2968/enib-cloud/refs/heads/main/aws/api/launch.sh --output launch.sh
curl https://raw.githubusercontent.com/yoann2968/enib-cloud/refs/heads/main/aws/api/launch.env --output launch.env

chmod +x launch.sh
nohup ./launch.sh &


echo "API app created"