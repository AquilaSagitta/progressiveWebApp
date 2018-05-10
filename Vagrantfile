# -*- mode: ruby -*-
# vi: set ft=ruby :

guestSrc = "/var/www"

Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "127.0.0.1"
    config.vm.synced_folder "./src", guestSrc

    config.vm.provision 'preemptively give others write access to /etc/ansible/roles', type: :shell, inline: <<~'EOM'
        sudo mkdir /etc/ansible/roles -p
        sudo chmod o+w /etc/ansible/roles
    EOM

    provisioner = Vagrant::Util::Platform.windows? ? :ansible_local : :ansible
        config.vm.provision provisioner do |ansible|
        ansible.galaxy_role_file = guestSrc + "/requirements.yml"
        ansible.galaxy_roles_path = "/etc/ansible/roles"
        ansible.galaxy_command = "ansible-galaxy install --role-file=%{role_file} --roles-path=%{roles_path}"
        ansible.playbook = guestSrc + "/playbook.yml"
    end
end
