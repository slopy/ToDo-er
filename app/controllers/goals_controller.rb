class GoalsController < ApplicationController

  def index
    respond_with current_user.goals
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


  private

  def goal_params
    params.require(:goal).permit(:title, :description, :user_id, :category_id, :done, :done_percent, :active)
  end

end
