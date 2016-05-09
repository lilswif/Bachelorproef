$script = <<SCRIPT
  # make sure Docker starts before SSH
  sed -i \
    -e '/Launch Docker/,$!{/Configure SSHD/,/^$/{H;d;};}' \
    -e '/Launch Docker/,/^$/{/^$/g;}' \
    /opt/bootscript.sh
  # and make sure it is started now
  /etc/rc.d/docker
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.box = 'dduportal/boot2docker'
  config.vm.network :private_network, ip: "192.168.100.100"
  config.vm.synced_folder ".", "/vagrant", type: "rsync"#,  rsync__exclude: "node_modules/"
  config.vm.network :forwarded_port, guest: 8085, host: 8085
  config.vm.network :forwarded_port, guest: 27017, host: 27017
  config.vm.provision "shell", inline: $script
  config.vm.provision :docker
  config.vm.provision :docker_compose, yml: "/vagrant/docker-compose.yml", run: "always"
end