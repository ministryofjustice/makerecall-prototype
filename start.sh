#!/bin/sh

set -euo pipefail

node ./node_modules/gulp/bin/gulp generate-assets \
  && node listen-on-port.js
