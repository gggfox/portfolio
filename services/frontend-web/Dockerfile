FROM node:20 AS build
WORKDIR /app

ADD package*.json ./
RUN npm install --legacy-peer-deps


ADD . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# RUN npm run dev
# RUN ls dist

# #ENTRYPOINT [ "node", "/app/dist/index.js" ]
# ENTRYPOINT [ "ls", "dist" ]