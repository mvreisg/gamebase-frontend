#!/bin/bash
sudo mkdir /var/www/html/public/config
sudo cp /home/ubuntu/environment.json /var/www/html/public/config/environment.json
cd /var/www/html
sudo docker compose down
sudo docker compose up --build -d