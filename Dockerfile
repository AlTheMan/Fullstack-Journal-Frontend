# Stage 1
FROM node:latest as build

# Set working directory
WORKDIR /react

# Add `/react/node_modules/.bin` to $PATH
ENV PATH /react/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Add app
COPY . ./

# Build the app
RUN npm run build
  

# Stage 2
FROM nginx:1.19.0

# Set working directory to Nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets from builder stage
COPY --from=build /react/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
