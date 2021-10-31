#!/bin/bash

OKG="\033[92m"
WARNING="\033[93m"
FAIL="\033[91m"
OKB="\033[94m"
UNDERLINE="\033[4m"
NC="\033[0m"

source .env

printf "%b" "${OKB}Authenticating docker for github container registry${NC}\n"
echo "$GHCR_PAT" | docker login ghcr.io -u "$GH_USERNAME" --password-stdin
printf "%b" "${OKB}Building project${NC}\n"
docker compose -f docker/dev/docker-compose.yaml up