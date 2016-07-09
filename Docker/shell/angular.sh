#!/bin/bash 

source "/vagrant/Docker/shell/env.conf"

imageName="hibo/angular2"
containerName="angular2"
host_src_dir="/home/vagrant/angular2/app"
container_src_dir="/home/vagrant/angular2-quickstart/app"
docker_dir="${path_Dockerfile_dir}/angular2"

# -t: docker側の標準出力をホストの標準出力につなげる。
# -i: ホスト側のキーボードで打った文字をコンテナに送る
# -p:ポートフォワディング ホスト側：コンテナ側
# -e:環境変数
# -u:user
# -v: ディレクトリ共有
run(){
  docker run --name $containerName --rm -it \
             -p 80:3000 \
             -m "300M" --memory-swap "1G" \
             -e "NODE_ENV=production" \
             -u vagrant \
             -v $host_src_dir:$container_src_dir \
             $imageName 
}

run_d(){
  docker run --name $containerName -i -d -p 80:3000 -v $host_src_dir:$container_src_dir $imageName
}


checkBeforeContainer $containerName
default $#

while getopts brdi opt
do
  main ${opt} $docker_dir $imageName $containerName
done


