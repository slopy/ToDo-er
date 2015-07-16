class User < ActiveRecord::Base
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

    has_many :goals, join_table: :categories, dependent: :destroy

    def goal_lists
        all_goals = Goal.where(user_id: self.id).order(updated_at: :desc)
        waiting_goals = all_goals.where(active: false).where(done: false)
        active_goals = all_goals.where(active: true).where(done: false) 
        done_goals = all_goals.where(active: true).where(done: true)
        categories = Category.all

        goals = {
            goals: all_goals,
            waiting_goals: waiting_goals,
            active_goals: active_goals,
            achieved_goals: done_goals,
            categories: categories

        }
    end

    def goal_stats
        all_goals = self.goals
        all_goals_count = all_goals.count
        waiting_goals_count = all_goals.where(active: false).where(done: false).count 
        active_goals_count = all_goals.where(active: true).where(done: false).count 
        done_goals_count = all_goals.where(active: true).where(done: true).count

        goals_stats = {
            goals: all_goals_count,
            waiting_goals: waiting_goals_count,
            active_goals: active_goals_count,
            achieved_goals: done_goals_count
        }
    end
end
