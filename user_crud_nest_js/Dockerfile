FROM node:lts-alpine

RUN apk add --no-cache bash 

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm install -g @nestjs/cli

RUN pnpm install prisma --save-dev

USER node 

ENTRYPOINT [".docker/entrypoint.sh"]

WORKDIR /home/node/app