FROM nginx:latest
EXPOSE 80
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY ./static /var/www
COPY ./static /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
# dsx move daemon off to config file
