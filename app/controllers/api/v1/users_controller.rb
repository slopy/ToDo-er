
class Api::V1::UsersController < Devise::RegistrationsController

    respond_to :json

    before_action :authenticate_user!

  def update
    user = current_user
    binding.pry
    if user.password_valid?(user_params[:current_password]) && user.update(user_params)
        sign_in use @user, bypass: true 
        respond_with user
    else
        render :json => {:errors => user.errors, :user => user }, status: 422 
    end
  end

  def delete
    current_user.destroy!
  end

  protected

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :current_password)
  end
end
