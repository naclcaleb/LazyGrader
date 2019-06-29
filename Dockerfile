FROM node:11
WORKDIR /opt/app/vc-frontend
RUN npm install webpack webpack-cli webpack-dev-server -g
COPY package.json ./
RUN npm install
COPY . ./
EXPOSE 8080
CMD yarn run dev
