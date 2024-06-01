FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# We are using private github repos so npm install needs authentication method available
# Following: https://sanderknape.com/2019/06/installing-private-git-repositories-npm-install-docker/
# This method passed SSH key in memory and doesn't store in Docker image.
RUN npm install --only=prod

COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
