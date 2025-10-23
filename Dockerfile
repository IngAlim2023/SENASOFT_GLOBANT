# Etapa 1: Construcción
FROM node:22-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye el proyecto
RUN npm run build

# Etapa 2: Servidor para archivos estáticos
FROM nginx:stable-alpine

# Copia los archivos generados al contenedor de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto por defecto de Nginx
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
