#!/usr/bin/env bash

set -euo pipefail

ROOT_FOLDER=$(pwd)

cd ${ROOT_FOLDER}/backend
npm run build

cd ${ROOT_FOLDER}/frontend
npm run build

cd ${ROOT_FOLDER}
docker compose up --build
