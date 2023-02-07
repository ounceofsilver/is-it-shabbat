#!/bin/bash

expo export:web
web_build_return_code="$?"

echo "isitshabbat.net" > web-build/CNAME

exit "${web_build_return_code}"