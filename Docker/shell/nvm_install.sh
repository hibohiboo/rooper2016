sudo wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.30.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install v4.2
nvm alias default v4.2

npm install -g npm
npm install -g yo gulp bower
npm install -g generator-gulp-angular
npm install -g generator-karma generator-angular
npm install -g express-generator 

sudo chown -R vagrant /home/vagrant/.nvm/versions/node/v4.2.4/lib/node_modules

sudo gem update --system
sudo gem install compass


