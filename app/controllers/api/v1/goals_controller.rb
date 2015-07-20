class Api::V1::GoalsController < ApiController

    def index
        goals = current_user.goal_lists
        respond_with goals
    end

    def create
        params[:goal].empty? ? goal=Goal.new : goal = Goal.new(goal_params)
        category = Category.where(title: params[:category]).first_or_create if params[:category]
        goal.category = category
        goal.user = current_user
        if goal.save
            goal.save!
            render :json => goal.to_json(include: :category), status: 200
        else
            if params[:category]
                render :json => {:errors => goal.errors,
                 :category_errors => category.errors, :goal => goal  }, status: 422
            else
                render :json => {:errors => goal.errors, :goal => goal  }, status: 422
            end
        end
    end

    def show
        goal = Goal.includes(:user).find(params[:id]).to_json(include: [:user,:category,:file])
        render :json => goal, status: 200
    end

    def update
        goal = Goal.find(params[:id])
        goal_check = Goal.new(goal_params)
        goal_check.user = current_user
        category = Category.where(title: params[:category]).first_or_create if params[:category]
        goal.category = category
        if goal_check.valid? && (category.valid? || !params[:category] || params[:category].empty?)
            goal.update_columns(goal_params)
            goal.update_columns(category_id: category.id)
            goal = goal.to_json(include: [:user,:category])
            if params[:category]
                render :json => {:goal => goal, :category => category }, status: 200
            else
                render :json => {:goal => goal}, status: 200
            end
        else
            goal.category = category
            goal.update(goal_params)
            if params[:category]
                render :json => {:errors => goal.errors,
                 :category_errors => category.errors, :goal => goal  }, status: 422
            else
                render :json => {:errors => goal.errors, :goal => goal  }, status: 422
            end
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

    def upload_file

        goal = Goal.find(params[:id])
        goal.file = goal_params[:file] 
        if goal.save
            render :json => goal, status: 200
        else
            render :json => {}, status: 422
        end
    end

    def destroy_file
        goal = Goal.find(params[:id])
        goal.remove_file!
        if goal.save
            goal = goal.to_json(include: [:user,:category])
            render :json => goal, status: 200
        else
            render :json => {}, status: 422
        end
    end

    private

    def goal_params
        params.require(:goal).permit(:id, :title, :description, :user_id, :category_id, :done, :done_percent, :active, :category, :file)
    end
end
