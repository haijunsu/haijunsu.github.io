#!/bin/bash

# This script generate an empty post document with title

USAGE="Usage $0 <post|page> <title>"
if [ "$#" == "0" ]; then
    echo "${USAGE}"
    exit 1
fi

# File name prefix
if [ "$1" == "post" ]; then
    TODAY="$(date +%Y-%m-%d)"
    FILE_NAME="${TODAY}"
    DOC_LAYOUT="post"
elif [ "$1" == "page" ]; then
    FILE_NAME=""
    DOC_LAYOUT="page"
else
    echo "Unsupport document type: $1"
    echo "${USAGE}"
    exit 1
fi
shift
TITLE=$*
while (( "$#" )); do
    lcword=`echo "$1" | awk '{print tolower($0)}'`
    if [ "X${FILE_NAME}" == "X" ]; then
        FILE_NAME=${lcword}
    else
        FILE_NAME="${FILE_NAME}-${lcword}"
    fi
    shift
done
FILE_NAME="${FILE_NAME}.md"
echo ${FILE_NAME}
echo "---" >> ${FILE_NAME}
echo "title: ${TITLE}" >> ${FILE_NAME}
echo "author: Haijun (Navy) Su" >> ${FILE_NAME}
echo "layout: ${DOC_LAYOUT}" >> ${FILE_NAME}
echo "---" >> ${FILE_NAME}
if [ -f /usr/local/bin/nvim ]; then
    /usr/local/bin/nvim ${FILE_NAME}
else
    vi ${FILE_NAME}
fi
