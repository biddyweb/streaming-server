root_dir              = "/opt/streaming-server"
licode_dir            = File.join root_dir, "licode"
erizo_controller_dir  = File.join licode_dir, "erizo_controller", "erizoController"
erizo_agent_dir  = File.join licode_dir, "erizo_controller", "erizoAgent"
nuve_dir              = File.join licode_dir, "nuve", "nuveAPI"
erizo_dir             = File.join licode_dir, "erizo"

pid_dir               = File.join root_dir, "pids"
log_dir               = File.join root_dir, "logs"

Eye.config do
  logger File.join(log_dir, "licode.eye.log")
end

Eye.application 'licode' do

  check :cpu, every: 10.seconds, below: 100, times: 3

  group 'erizo' do

    env 'LD_LIBRARY_PATH' => "$LD_LIBRARY_PATH:#{licode_dir}/erizo/build/erizo:#{licode_dir}/erizo:#{licode_dir}/build/libdeps/build/lib"
    env 'ERIZO_HOME' => "ERIZO_HOME=#{erizo_dir}/"

    process :erizoController do |p|
      working_dir erizo_controller_dir
      pid_file File.join(pid_dir, "erizoController.pid")
      daemonize true

      start_command "node erizoController.js"
      stdout File.join(log_dir, "erizoController.log")
    end

    process :erizoAgent do |p|
      working_dir erizo_agent_dir
      pid_file File.join(pid_dir, "erizoAgent.pid")
      daemonize true

      start_command "node erizoAgent.js"
      stdout File.join(log_dir, "erizoAgent.log")
    end

  end

  process :nuve do |p|
    working_dir nuve_dir
    pid_file File.join(pid_dir, "nuve.pid")
    daemonize true

    start_command "node nuve.js"
    stdout File.join(log_dir, "nuve.log")
  end
end
