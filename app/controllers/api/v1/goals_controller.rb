class Api::V1::GoalsController < ApiController

    def index
        
        goals = current_user.goal_lists
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
        goal = Goal.includes(:user).find(params[:id]).to_json(include: :user)
        render :json => goal, status: 200
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
        params.require(:goal).permit(:id, :title, :description, :user_id, :category_id, :done, :done_percent, :active, :categoy_title)
    end
end
