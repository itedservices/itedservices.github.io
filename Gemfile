source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

group :jekyll_plugins do
  gem 'octopress-paginate'
  gem 'jekyll-sitemap'
  gem 'github-pages', versions['github-pages']
end
