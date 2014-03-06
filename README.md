streaming-server
================

# For an Amazon deployment.

The licode_config.js should set cloudProvider like this.

```javascript
config.cloudProvider.name = 'amazon';
//In Amazon Ec2 instances you can specify the zone host. By default is 'ec2.us-east-1a.amazonaws.com'
config.cloudProvider.host = ''// 'ec2.us-east-1.amazonaws.com';
config.cloudProvider.accessKey = 'XXXXXXXXX';
config.cloudProvider.secretAccessKey = 'XXXXXXXX';
```

For the access keys, you can add a user on the IAM aws console with the `AmazonEC2ReadOnlyAccess` permission

# Setup TURN/STUN Server

To setup the server on Ubuntu 12.04 follow this steps. If there are dependency unresolved, try `sudo apt-get install -f`

## Install the turnserver

```bash
wget http://turnserver.open-sys.org/downloads/v3.2.2.8/turnserver-3.2.2.8-debian-wheezy-ubuntu-mint-x86-64bits.tar.gz
tar zxvf turnserver-3.2.2.8-debian-wheezy-ubuntu-mint-x86-64bits.tar.gz
sudo dpkg -i rfc5766-turn-server_3.2.2.8-1_amd64.deb
```

## Enable turn server to start uncommenting the line in

```bash
sudo vim /etc/default/rfc5766-turn-server
```

## Add users Exem. user1:password1

```bash
sudo vim /etc/turnuserdb.conf
```

## Setup external IP Amazon EC2
Edit the config and setup the certificates. (You need to generate the cert before)

```bash
sudo vim /etc/turnserver.conf
```

Uncomment and edit

```
external-ip=YOUR_PUBLIC_IP_ADDRESS
realm=peepol.tv
cert=/home/user/server.crt
pkey=/home/user/server.key
```

