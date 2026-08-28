module.exports = {
  apps: [
    {
      name: 'offerekini',
      script: 'server.js',
      interpreter: 'node',
      interpreter_args: '--import tsx/esm',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M'
    }
  ]
}
