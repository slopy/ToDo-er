class AddGoalFileToGoals < ActiveRecord::Migration
  def change
    add_column :goals, :file, :string
  end
end
