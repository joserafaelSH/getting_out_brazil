#!/bin/bash

pnpm i

pnpm prepare

pnpm run build

pnpm run start:dev