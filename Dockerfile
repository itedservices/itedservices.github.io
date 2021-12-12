FROM ruby:2.6
RUN apt-get update && apt-get install -y nodejs

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .
