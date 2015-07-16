class Category < ActiveRecord::Base

    has_many :goals
    
    validates :title, presence: true, length: { in: 6..30 }
    
end
