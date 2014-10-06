## BETA CONFIGURATION
set :rails_env, :production

set :nginx_domains, "streaming-beta.rhinobird.tv"
set :branch, "master"

server 'turing.rhinobird.tv', user: 'deploy', roles: %w{web}
