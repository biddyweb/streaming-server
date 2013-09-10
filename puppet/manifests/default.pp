Exec { path => [ '/bin/', '/sbin/', '/usr/bin/', '/usr/sbin/' ] }

class {"apt":}
class system-update {
	exec { 'apt-get update':
		command => 'apt-get update',
	}
}

class properties-packages {
	$propertiesPackages = ['python-software-properties', 'software-properties-common']
	package { $propertiesPackages:
	  ensure  => installed,
	  require  => Class["system-update"],
	}
}

class chris_ppa {
    apt::ppa {"chris-lea":
        ensure  => present,
        key     => "C7917B12",
        ppa     => ["node.js"]
    }

    exec {"/usr/bin/apt-get update":
        require => Apt::Ppa["chris-lea"],
        subscribe => Apt::Ppa["chris-lea"],
        refreshonly => true,
    }
}

class licode::dependencies {
	require chris_ppa

	$lynckia_deps = [
		'git',
		'make',
		'gcc',
		'g++',
		'libssl-dev',
		'cmake',
		'libnice10',
		'libnice-dev',
		'libglib2.0-dev',
		'pkg-config',
		'nodejs',
		'libboost-regex-dev',
		'libboost-thread-dev',
		'libboost-system-dev',
		'rabbitmq-server',
		'mongodb',
		'openjdk-6-jre'
	]

	package { $lynckia_deps:
	  ensure => installed,
	  require => Apt::Ppa["chris-lea"],
	}
}

class licode {
	exec { 'installErizo':
		command => '/vagrant/licode/scripts/installErizo.sh',
	}

	exec { 'installNuve':
		command => '/vagrant/licode/scripts/installNuve.sh',
	}
}

include system-update
include properties-packages
include licode::dependencies
include licode


