# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  config.vm.network :public_network

  config.vm.network :forwarded_port, guest: 8080, host: 8180

  #config.vm.provision :puppet do |puppet|
  #  puppet.manifests_path = "puppet/manifests"
  #  puppet.module_path    = "puppet/modules"
  #  puppet.options = ['--verbose']
  #end
  config.vm.synced_folder "../transcoding-service/", "/opt/transcoding"
end
