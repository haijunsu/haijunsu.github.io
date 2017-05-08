#!/bin/bash

# This script generate an empty post document with title

USAGE="Usage $0 <title>"
if [ "$#" == "0" ]; then
    echo "${USAGE}"
    exit 1
fi
# File name prefix
TODAY="$(date +%Y-%m-%d)"
FILE_NAME=${TODAY}
TITLE=$*
while (( "$#" )); do 
    lcword=`echo "$1" | awk '{print tolower($0)}'`
    FILE_NAME="${FILE_NAME}-${lcword}"
    shift
done
FILE_NAME="${FILE_NAME}.md"
echo ${FILE_NAME}
echo "---" >> ${FILE_NAME}
echo "title: ${TITLE}" >> ${FILE_NAME}
echo "author: Haijun (Navy) Su" >> ${FILE_NAME}
echo "layout: post" >> ${FILE_NAME}
echo "---" >> ${FILE_NAME}
vi ${FILE_NAME}
