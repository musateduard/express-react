FROM nginx:1.28.0-bookworm

RUN apt-get update
RUN apt-get install -y certbot python3-certbot-nginx

# delete and recreate nginx/conf.d folder
RUN rm -rf /etc/nginx/conf.d && mkdir /etc/nginx/conf.d

# delete and recreate html folder
RUN rm -rf /usr/share/nginx/html && mkdir /usr/share/nginx/html

# delete log symlinks and create as files
RUN rm /var/log/nginx/access.log && touch /var/log/nginx/access.log
RUN rm /var/log/nginx/error.log && touch /var/log/nginx/error.log

# copy nginx config
COPY ./server-config/conf.d /etc/nginx/conf.d
COPY ./server-config/nginx.conf /etc/nginx

# copy deployment files
COPY ./dist /usr/share/nginx/html/express.musat.cc
