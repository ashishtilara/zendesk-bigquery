#!/usr/bin/env bash

export DEPLOYMENT_BUCKET='deployment-bucket-name'
export ENV="dev"
# every day - 12:00 pm Sydney/Australia
# every day - 1:00 am UTC
export SCHEDULE="cron(0 1 * * ? *)"

export ZENDESK_USERNAME=""
export ZENDESK_TOKEN=""
export ZENDESK_URI=""

export GOOGLECLOUD_BUCKET=""
export GOOGLECLOUD_PREFIX=""
export GOOGLECLOUD_PROJECTID=""
export GOOGLECLOUD_DATASETID=""
export GOOGLECLOUD_TABLEID=""
export GOOGLECLOUD_CRED_PRIVATEKEY="$(echo "GCP_PRIVATEKEY" | base64)"
export GOOGLECLOUD_CRED_CLIENTEMAIL=""
