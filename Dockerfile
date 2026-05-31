FROM node:lts-alpine AS pre-build-stage
WORKDIR /app
COPY . .

# Install dependencies after container start to sync packages with local environment
FROM pre-build-stage AS development
EXPOSE 5173
CMD ["sh", "start-dev.sh"]

# Install dependencies to be used in production
FROM pre-build-stage AS build-stage
RUN npm install
RUN npm run build

# Production build based on nginx image
FROM nginx:stable-alpine AS production
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
