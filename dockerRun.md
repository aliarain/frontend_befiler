## Run project with Dockerfile

```bash
1. sudo docker build -t taxstick-live-frontend-img -f Dockerfile .
```

```bash
2. sudo docker run --rm --name taxstick-live-frontend-container -p 3005:3005 -d taxstick-live-frontend-img
```

### Verify the PM2 Process

```bash
$ sudo docker exec -it <container_id> pm2 list
```