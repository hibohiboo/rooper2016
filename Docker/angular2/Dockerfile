FROM node:6.2.2

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
CMD ["/bin/bash" ]