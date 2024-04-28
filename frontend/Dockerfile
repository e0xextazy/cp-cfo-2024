FROM node:18.19.1-alpine as build
WORKDIR /usr/src/app

ARG VITE_ENABLE_MOCK
ENV VITE_ENABLE_MOCK=$VITE_ENABLE_MOCK
ARG VITE_API_HOST
ENV VITE_API_HOST=$VITE_API_HOST

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:latest as proxy
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80