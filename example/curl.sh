#!/usr/bin/env bash

data=('{"chat_id":"'"$2"'","text": "Hello World!"}')
json="${data[*]}"
echo "${json}"

curl --header "Content-Type: application/json" \
  --request POST \
  --data $json \
  -v \
  https://simple-http-proxy.zeckson.now.sh/bot$1/sendMessage
