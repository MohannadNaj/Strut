#!/bin/sh

grunt build
mv dist dist-temp
git checkout gh-pages
rm -r dist
mv dist-temp .
git add -a
git commit -m "rebuilt"