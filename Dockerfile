FROM node:11
WORKDIR /opt/app/vc-frontend
COPY . /opt/app/vc-frontend
RUN yarn install
