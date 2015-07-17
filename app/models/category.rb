class Category < ActiveRecord::Base

    has_many :goals
    
    validates :title, presence: true, length: { in: 3..10 }
    
end
