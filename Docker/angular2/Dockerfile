FROM node:6.3.0

# Add our user and group first to make sure their IDs get assigned consistently
RUN groupadd -r vagrant && useradd -r -g vagrant vagrant 

ENV DOCKER_FILE_DIR=/vagrant/Docker/angular2
ENV WORK_DIR=/home/vagrant/angular2-quickstart

RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

# COPY命令では../のように親ディレクトリは指定できない。
# 構築時にコンテクストのディレクトリ以下をDockerデーモンに送るため
COPY package.json $WORK_DIR/package.json
COPY tsconfig.json ${WORK_DIR}/tsconfig.json
COPY typing.json ${WORK_DIR}/typing.json
COPY system.config.js ${WORK_DIR}/system.config.js
RUN npm install

RUN mkdir app
CMD ["/bin/bash" ]