streaming-server
================

# For Amazon deployment.

licode_config.js should be at least configured with this options

```javascript
// Use '' to automatically get IP from the interface
config.erizoController.publicIP = '54.235.204.77'; //default value: ''
// Use '' to use the public IP address instead of a hostname
config.erizoController.hostname = 'turing.rhinobird.tv'; //default value: ''
config.erizoController.port = 443; //default value: 8080
// Use true if clients communicate with erizoController over SSL
config.erizoController.ssl = true; //default value: false

//Use undefined to run clients without Turn
config.erizoController.turnServer = {}; // default value: undefined
config.erizoController.turnServer.url = 'turn:54.235.204.77:5349'; // default value: null
config.erizoController.turnServer.username = 'USERNAME'; // default value: null
config.erizoController.turnServer.password = 'PASSWORD'; // default value: null

config.erizo.stunserver = '54.235.204.77'; // default value: ''
config.erizo.stunport = 5349; // default value: 0
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

## Updating Licode server
It's best to make a volume snapshot to rollback easly

Update the git submodule(`rhinobird/licode` should be already updated with latest changes)

```bash
git submodule update
cd licode
git pull origin master
cd ..
git add licode
git ci -m "chore(licode): Updated licode submodule"
```
