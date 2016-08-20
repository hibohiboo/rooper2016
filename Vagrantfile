$docker_install = <<SHELL
    sudo killall -KILL apt.systemd.daily
    sudo apt-get update
    sudo apt-get install apt-transport-https ca-certificates

    sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

    echo 127.0.1.1 $(hostname) >> /etc/hosts

    echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" > /etc/apt/sources.list.d/docker.list

    sudo apt-get update
    sudo apt-get purge lxc-docker
    apt-cache policy docker-engine

    sudo apt-get update
    sudo apt-get install -y linux-image-extra-$(uname -r)

    sudo apt-get update
    sudo apt-get -y install docker-engine
    sudo gpasswd -a vagrant docker
SHELL

Vagrant.configure(2) do |config|
  config.vm.box = "bento/ubuntu-16.04"
  
  # ネットワーク設定。
  config.vm.network "private_network", ip: "192.168.50.12"
  
  # 共有するフォルダの設定
  # config.vm.synced_folder 'angular2', '/home/vagrant/angular2'
  
  # 使用するメモリ容量を変更。
  # デフォルトだと512で少ないためdockerのbuildが失敗しやすい
  config.vm.provider "virtualbox" do |vm|
    # メモリを1024MBに設定
    vm.memory = 2048
    # Vagrant1.8から利用出来るLinked Cloneをオンにする。
    vm.linked_clone = true
    vm.cpus = 2
    vm.customize [ "modifyvm", :id, "--ioapic", "on"]
  end

  # dockerをインストール
  config.vm.provision "shell", inline: $docker_install

end
