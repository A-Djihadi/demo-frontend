# --- Étape 1 : build Angular ---
FROM node:24-bookworm-slim AS build
WORKDIR /app

# Installe les dépendances à partir du lockfile (reproductible)
COPY package.json package-lock.json ./
RUN npm ci

# Copie les sources et construit l'application
COPY . .
RUN npx ng build

# --- Étape 2 : serveur nginx non privilégié ---
FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/demo-frontend/browser /usr/share/nginx/html
EXPOSE 8080