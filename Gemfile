source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

group :jekyll_plugins do
  # gem 'github-pages', versions['github-pages']
  gem 'octopress-paginate'
  gem 'jekyll-sitemap'
  gem 'jekyll-assets'
  gem "uglifier"
  gem 'bootstrap-sass'
  gem 'font-awesome-sass'
  gem 'jekyll', '2.4.0'
end
