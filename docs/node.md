# NodeJS Application Runtime

## Setup pm2
pm2 is a process manager for node.js applications, with it we can daemonize nodejs processes as a service.

Install the lib globally as we will use the cli tool for process management
```bash
npm install pm2@latest -g
```

And start pm2
```bash
pm2 start index.js
```

## Startup service (systemctl)

```bash
pm2 startup systemd
...
pm2 save
```

Start the service through systemctl
```bash
sudo systemctl start pm2-${service_name}
```

# Process management

```bash
pm2 stop ${app_name_or_id}
pm2 restart ${app_name_or_id}
pm2 list
pm2 info ${app_name}
pm2 monit
```
