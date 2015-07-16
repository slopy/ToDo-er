# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



(1..10).each { |g|

Goal.create(
	title: "goal nr #{g}",
	description: "Description for goal nr #{g}",
    user_id: User.last
	)
}

(1..10).each { |c|
Category.create(
    title: "category nr #{c}"
    )
}