# Stage 1
FROM node:current-alpine as build

# Set working directory
WORKDIR /react

# Add `/react/node_modules/.bin` to $PATH
ENV PATH /react/node_modules/.bin:$PATH

# Install app dependencies
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
  
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /react/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
