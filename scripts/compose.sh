#!/bin/bash
OKG="\033[92m"
WARNING="\033[93m"
FAIL="\033[91m"
OKB="\033[94m"
UNDERLINE="\033[4m"
NC="\033[0m"

# handle all non-zero error status codes
trap 'handler $? $LINENO' ERR

function handler() {
    # print error message and propagate error status
    if [ "$1" != "0" ]; then
        printf "%b" "${FAIL} ✗ ${NC}Failed with status: $1 on line: $2\n"
        exit "$1"
    fi
}

function usage() {
  cat <<EOF
Usage: ./compose.sh [arg1] [arg2]
Execute docker compose build or teardown directive
Required arguments:
[arg1]      stage (i.e. dev or prod)
[arg2]      docker compose state (i.e. up or down) 
EOF
}

if [ "$#" -ne 2 ]; then
    printf "%b" "${FAIL}Illegal parameters ${NC}\n" 
    printf "%b" "$(usage)\n"
    exit 1;
fi

STAGE="$1"
STATE="$2"

printf "%b" "${OKB}Composing docker containers for $STAGE:$STATE${NC}\n" 
docker-compose -f docker/docker-compose.yaml -f docker/"$STAGE".yaml "$STATE"
printf "%b" "${OKG} ✓ ${NC} docker compose complete\n" 