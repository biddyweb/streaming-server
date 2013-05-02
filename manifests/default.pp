exec { "apt-get update":
  path => "/usr/bin",
}
package { "python-software-properties":
  ensure  => present,
  require => Exec["apt-get update"],
}
package { "software-properties-common":
  ensure  => present,
  require => Exec["apt-get update"],
}

exec { "add-apt-repository":
  command   => "/usr/bin/add-apt-repository ppa:chris-lea/node.js-legacy",
   notify    => Exec['apt-get update']
 }

 $lynckia_reqs = ['git', 'make', 'gcc', 'g++', 'libssl-dev', 'cmake', 'libnice10', 'libnice-dev', 'libglib2.0-dev', 'pkg-config', 'nodejs', 'nodejs-dev', 'npm', 'libboost-regex-dev', 'libboost-thread-dev', 'libboost-system-dev', 'rabbitmq-server', 'mongodb', 'openjdk-6-jre']

package { $lynckia_reqs:
  ensure => installed,
  require => Exec["add-apt-repository"]
}