#!/bin/bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb;
sudo dpkg -i google-chrome-stable_current_amd64.deb;
sudo rm -rf google-chrome-stable_current_amd64.deb;
sudo apt-get install -fy;
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs git mongodb;
sudo npm install -g babel-cli;
cd /;
sudo mkdir -p /data/db/;
sudo service mongodb start;
