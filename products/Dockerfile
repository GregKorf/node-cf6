# version of node to use
FROM node:21

# directory to save image
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install

# bundle app source
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]