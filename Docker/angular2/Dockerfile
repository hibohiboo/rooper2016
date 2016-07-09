FROM node:4.4.7

# Add our user and group first to make sure their IDs get assigned consistently
RUN groupadd -r vagrant && useradd -r -g vagrant vagrant 

ENV DOCKER_FILE_DIR=/vagrant/Docker/angular2
ENV WORK_DIR=/home/vagrant/angular2-quickstart

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

RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

# COPY命令では../のように親ディレクトリは指定できない。
# 構築時にコンテクストのディレクトリ以下をDockerデーモンに送るため
COPY package.json $WORK_DIR/package.json
RUN npm install

# 各種設定ファイル用意
COPY tsconfig.json ${WORK_DIR}/tsconfig.json
COPY typing.json ${WORK_DIR}/typing.json
COPY systemjs.config.js ${WORK_DIR}/systemjs.config.js

RUN mkdir app

# ======================================================================
ENV SHARE_DIR=/home/vagrant/share
RUN mkdir -p ${SHARE_DIR}
# ======================================================================

WORKDIR ${GULP_DIR}
CMD ["npm", "run", "gulp" ]