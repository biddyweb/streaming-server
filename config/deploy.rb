#########################################
# Negroky deploy.rb configuration file
#
# There are three types of settings here
#  * Capistrano settings
#  * Gem specific settings
#  * Negroku settings

set :application,   "streaming-service"
set :repo_url,      'https://github.com/rhinobird/streaming-server.git'
set :deploy_to,     "/opt/#{fetch(:application)}"

linked_files = Set.new(fetch(:linked_files, [])) # https://github.com/capistrano/rails/issues/52
linked_files.merge(%w{})
set :linked_files, linked_files.to_a

linked_dirs = Set.new(fetch(:linked_dirs, [])) # https://github.com/capistrano/rails/issues/52
linked_dirs.merge(%w{logs})
set :linked_dirs, linked_dirs.to_a

set :nginx_template, "#{stage_config_path}/nginx.conf.erb"
