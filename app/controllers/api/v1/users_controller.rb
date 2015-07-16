class Api::V1::UsersController < ApiController

    def update
        current_user
        password = user_params[:current_password]
    if current_user.password == password && current_user.update(user_params)
        sign_in(:user, current_user, bypass: true) 
        render :json => current_user, status: 200
    else
        render :json => {:errors => current_user.errors, :user => current_user }, status: 422 
    end
    end

    def destroy
        current_user.destroy!
        render :json => {}, status: 200
    end

    def get_stats
        user_stats = current_user.goal_stats
        render :json => { :stats => user_stats }, status: 200
    end

    protected

    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end

end
