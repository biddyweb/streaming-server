exec { "apt-get update":
  path => "/usr/bin"
}

package { 'python-software-properties':
  ensure  => installed,
  require  => Exec['apt-get update'],
}

exec { "node.js-legacy":
  command   => "/usr/bin/add-apt-repository ppa:chris-lea/node.js-legacy",
  require => Package["python-software-properties"],
}

$lynckia_reqs = ['git', 'make', 'gcc', 'g++', 'libssl-dev', 'cmake', 'libnice10', 'libnice-dev', 'libglib2.0-dev', 'pkg-config', 'nodejs', 'nodejs-dev', 'npm', 'libboost-regex-dev', 'libboost-thread-dev', 'libboost-system-dev', 'rabbitmq-server', 'mongodb', 'openjdk-6-jre']

package { $lynckia_reqs:
  ensure => installed,
  require => Exec["node.js-legacy"]
}

