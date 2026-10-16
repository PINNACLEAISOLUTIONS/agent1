FROM node:22-alpine
WORKDIR /app
COPY server.mjs ./
USER node
ENV NODE_ENV=production PORT=10000 OPENBOT_HOST=0.0.0.0
EXPOSE 10000
CMD ["node", "server.mjs"]
