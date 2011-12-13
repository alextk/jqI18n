require 'rubygems'
gem 'rego-ruby-ext'
require "rego-ruby-ext"
gem 'rego-js-builder'
require "rego-js-builder"
gem 'rake-hooks'
require 'rake/hooks'

project = JsProjectBuilder.new(
  :name => 'jqI18n',
  :description => 'jQuery based localization mixin',
  :file_name => 'jquery.i18n.js',
  :js_files => %w{i18n.js}
)
JsProjectBuilder::Tasks.new(project)

