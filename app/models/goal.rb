class Goal < ActiveRecord::Base

    belongs_to :user

    # validations:
    validates :user, presence: true
    validates :title, presence: true, length: { in: 6..30 }
    validates :description, presence: true, length: { in: 3..100 }
end
