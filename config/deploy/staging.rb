## BETA CONFIGURATION
set :rails_env, :production

set :nginx_domains, "streaming-staging.rhinobird.tv"
set :branch, "master"

server 'codd.rhinobird.tv', user: 'deploy', roles: %w{web}
