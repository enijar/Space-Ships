#!/usr/bin/env bash

if [[ ENV == 'production' ]]
then
    npm run build
else
    npm run watch
fi
