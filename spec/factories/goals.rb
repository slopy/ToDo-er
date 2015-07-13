FactoryGirl.define do
    factory :goal do |f|
        f.user_id 1
        f.category_id 1
        f.title "MyString"
        f.description "MyString"
        f.done false
        f.done_percent 1
    end

end
