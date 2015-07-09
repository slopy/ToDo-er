class GoalsController < ApplicationController

    def index
        respond_with Goal.where("user_id == ?",current_user.id)
    end

    def create
        goal = Goal.new(goal_params)
        goal.user = current_user
        goal.save!
        respond_with goal 
    end

    def show
        respond_with Goal.find(params[:id])
    end

    def toggleActive
        goal = Goal.find(params[:id])
        goal.active = !goal.active

        goal.save!

        respond_with goal
    end

    def toggleDone
        goal = Goal.find(params[:id])
        goal.done = !goal.done

        goal.save!

        respond_with goal
    end

    private

    def goal_params
        params.require(:goal).permit(:title, :description, :user_id, :category_id, :done, :done_percent, :active)
    end

end
