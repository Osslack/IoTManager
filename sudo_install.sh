#!/bin/bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10;
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list;
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs git mongodb-org;
sleep 10;
cd ~;
git clone https://github.com/Osslack/IoTManager;
cd ~/IoTManager/ejs-neu/;
npm install -g babel-cli;
npm install;
npm start;
