#!/bin/bash

expo build:web
web_build_return_code="$?"

echo "isitshabbat.net" > web-build/CNAME

exit "${web_build_return_code}"