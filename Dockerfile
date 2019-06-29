FROM node:11
WORKDIR /opt/app/vc-frontend
RUN npm install webpack webpack-cli -g
RUN ls /opt/app/vc-frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD yarn run dev
