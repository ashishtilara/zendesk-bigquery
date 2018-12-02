#!/usr/bin/env bash

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

source $SCRIPTPATH/environment.sh

serverless deploy
