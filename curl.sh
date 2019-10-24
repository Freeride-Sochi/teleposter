#!/usr/bin/env bash

data='{"chat_id":"'$2'","text": "Hello World!"}'
echo $data

curl --header "Content-Type: application/json" \
  --request POST \
  --data $data \
  -v \
  https://simple-http-proxy.zeckson.now.sh/bot$1/sendMessage
