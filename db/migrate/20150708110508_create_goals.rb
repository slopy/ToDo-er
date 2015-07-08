class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.integer :user_id
      t.integer :category_id
      t.string :title
      t.string :description
      t.boolean :active
      t.boolean :done, :default => false
      t.integer :done_percent, :default => 0

      t.timestamps null: false
    end
  end
end
