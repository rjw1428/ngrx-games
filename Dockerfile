FROM node:12-alpine
WORKDIR /ngrx-tic-tac-toe
COPY . .
RUN npm install --production
CMD ["ts-node", "-P", " ./server/server.tsconfig.json", "./server/server.ts"]