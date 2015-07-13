require 'spec_helper'

describe Goal do
  describe 'validations' do
    it { should validate_presence_of :title }
    it { should validate_length_of(:title).is_at_least(6).is_at_most(30).on(:create).on(:update)}

    it { should validate_presence_of :description }
    it { should validate_length_of(:description)
        .is_at_least(3).is_at_most(100).on(:create).on(:update) }


    it { should validate_presence_of :user }

    end
end
