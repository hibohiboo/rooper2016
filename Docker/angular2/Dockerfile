FROM node:4.4.7

# Add our user and group first to make sure their IDs get assigned consistently
RUN groupadd -r vagrant && useradd -r -g vagrant vagrant 

ENV DOCKER_FILE_DIR=/vagrant/Docker/angular2
ENV HOME_DIR=/home/vagrant
ENV WORK_DIR=${HOME_DIR}/angular2-webpack-starter


# ======================================================================
#タスクランナーインストール
ENV GULP_DIR=/home/vagrant/gulp
RUN mkdir -p ${GULP_DIR}
WORKDIR ${GULP_DIR}

# package.jsonを書き出し
# nameをgulpにするとエラーとなる
RUN echo '{ "name": "my_gulp",  "scripts": { "gulp":"gulp" }}' > package.json

# install
RUN npm install -g gulp 
RUN npm install --save-dev gulp 
RUN npm install --save-dev require-dir 
RUN npm install --save-dev gulp-if 

#gulpfileを書き出し
RUN echo "var requireDir = require('require-dir'); requireDir('/home/vagrant/share/gulp/tasks/', { recurse: true }); " > gulpfile.js 

# ======================================================================

RUN mkdir -p ${HOME_DIR}
WORKDIR ${HOME_DIR}

RUN git clone --depth 1 https://github.com/angularclass/angular2-webpack-starter.git
WORKDIR ${WORK_DIR}

RUN npm install

RUN sed -i.bak -e 's/localhost/0.0.0.0/' ./config/webpack.dev.js

# RUN sed -i.bak -e "s/METADATA\.host/'0.0.0.0'/" ./config/webpack.dev.js

WORKDIR ${GULP_DIR}
CMD ["npm", "run", "gulp" ]