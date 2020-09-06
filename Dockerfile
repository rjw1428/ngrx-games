FROM node:12-alpine
WORKDIR /ngrx-tic-tac-toe
COPY . .
RUN npm install --save-dev nodemon ts-node
CMD ["ts-node", "-P", " ./server/server.tsconfig.json", "./server/server.ts"]