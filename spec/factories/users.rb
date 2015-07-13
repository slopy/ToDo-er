FactoryGirl.define do
  require 'faker'

  factory :user do |f|
    f.email { Faker::Internet.email }
    f.password 'password123'
    f.password_confirmation 'password123'

  end

end
