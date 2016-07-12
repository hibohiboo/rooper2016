#!/bin/bash 

source "/vagrant/Docker/shell/env.conf"

imageName="hibo/angular2"
containerName="angular2"
host_src_dir="/vagrant/share"
container_src_dir="/home/vagrant/share"
docker_dir="${path_Dockerfile_dir}/angular2"

# -t: docker側の標準出力をホストの標準出力につなげる。
# -i: ホスト側のキーボードで打った文字をコンテナに送る
# -p:ポートフォワディング ホスト側：コンテナ側
# -e:環境変数
# -u:user
# -v: ディレクトリ共有
# -w: ワークディレクトリ
run(){
  docker run --name $containerName --rm -it \
             -p 8080:8080 \
             -m "300M" --memory-swap "512M" \
             -e "NODE_ENV=production" \
             -v $host_src_dir:$container_src_dir \
             $imageName 
}

run_d(){
  docker run --name $containerName -d -i \
             -p 8080:8080 \
             -m "300M" --memory-swap "512M" \
             -e "NODE_ENV=development" \
             -v $host_src_dir:$container_src_dir \
             $imageName
}

checkBeforeContainer $containerName
default $#

while getopts brdi opt
do
  main ${opt} $docker_dir $imageName $containerName
done


