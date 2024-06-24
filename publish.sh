#! /bin/bash

./rundocker bundler install
./rundocker bundler exec rake generate

temp_dir=`mktemp -d`

cp -R ./_site/* $temp_dir
cd $temp_dir

git init
git add .
git commit -m "update site"
git remote add origin "https://github.com/itedservices/itedservices.github.io.git"
git push origin main --force