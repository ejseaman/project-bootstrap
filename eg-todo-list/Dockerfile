FROM nginx:latest
EXPOSE 80
# COPY nginx.conf /etc/nginx/nginx.conf
COPY ./src/*.html /usr/share/nginx/html
COPY ./src/*.css /usr/share/nginx/html
COPY ./build.js /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
# dsx move daemon off to config file
