class Api::V1::GoalsController < ApiController

    before_action :authenticate_user!

    def index
        all_goals = Goal.where(user_id: current_user.id).order(updated_at: :desc)
        waiting_goals = all_goals.where(active: false).where(done: false) 
        active_goals = all_goals.where(active: true).where(done: false) 
        done_goals = all_goals.where(active: true).where(done: true)
        goals = {
            goals: all_goals,
            waiting_goals: waiting_goals,
            active_goals: active_goals,
            achieved_goals: done_goals
        }
        respond_with goals
    end

    def create
        params[:goal].empty? ? goal=Goal.new : goal = Goal.new(goal_params)
        goal.user = current_user
        if goal.save
            goal.save!
            render :json => goal, status: 200
        else
            render :json => {:errors => goal.errors, :goal => goal }, status: 422
        end
    end

    def show
        respond_with Goal.find(params[:id])
    end

    def update
        goal = Goal.find(params[:id])
        goal_check = Goal.new(goal_params)
        goal_check.user = current_user

        if goal_check.valid?
            goal.update_columns(goal_params)
            render :json => {:goal => goal }, status: 200
        else
            goal.update(goal_params)
            render :json => {:errors => goal.errors, :goal => goal }, status: 422
        end # to avoid updated_at change

    end

    def destroy
        goal = Goal.find(params[:id])
        goal.destroy!
        respond_with :nil
    end

    def toggleActive
        goal = Goal.find(params[:id])
        goal.active = !goal.active

        goal.save

        render :json => goal, status: 200
    end

    def toggleDone
        goal = Goal.find(params[:id])
        goal.done = !goal.done

        goal.save

        render :json => goal, status: 200
    end

    private

    def goal_params
        params.require(:goal).permit(:id, :title, :description, :user_id, :category_id, :done, :done_percent, :active)
    end
end
