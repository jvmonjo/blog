---
pubDatetime: 2020-10-29T05:35:07.322Z
title: "Setting up an Ubuntu server [part 2]: Portainer and Nginx"
description: Using Docker is one of the cleanest and easiest ways to maintain our web apps organized, up and running.
tags:
  - devops
  - Ubuntu
  - linux
author: Josep Monjo
---

Using Docker is one of the cleanest and easiest ways to maintain our web apps organized, up and running.

<!--more-->

We certainly could do it using the docker cli, but there's a much better way to do it using a GUI named [Portainer](https://www.portainer.io/).

To install portainer just need to create a volume and run the portainer container like so.

`docker volume create portainer_data`

`docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce`

We will be able to access portainer though the port 9000 (later we will configure nginx proxy to access outside our network without opening extra ports).

`http://<ip-of-the-machine>:9000`

### Nginx proxy manager

Nginx is a very well known web server. We could use it right straight away with config files, but as we are not devops but developers we prefer using a nice web app. Here's where [Nginx proxy manager](https://nginxproxymanager.com/) enters in scene.

Go to your home folder and create an nginx folder. You could name it whatever you want, It is just a workspace.

```bash
mkdir nginx
cd nginx

```

Create a docker-compose.yml file

`$ nano docker-compose.yml`

Edit the file according to the values of the config.json file

```yaml{codeTitle: "docker-compose.yml"}
version: '3'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

Before you can run the docker compose without sudo, you need to add your user to docker group.

`sudo groupadd docker`

`sudo usermod -aG docker $USER`

Then you may need to logout and log back in or run this with sudo:

`docker-compose up -d`

Go to port 81 to enter the web interface.

`http://<ip-of-the-machine>:81`

These are the default credentials.

```text
Email:    admin@example.com
Password: changeme
```

Modify the credentials on your first login, and that's all, you're good to go. We have a very intuitive and easy to use proxy for our Docker apps.

The first proxy you'll want to add is the nginx manager itself. And the second one Portainer.
