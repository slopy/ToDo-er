class UsersController < ApplicationController

  def update
    user = current_user

    if user.password_valid?(user_params[:current_password]) && user.update(user_params)
        sign_in use @user, bypass: true 
        respond_with user
    else
        respond_with nil
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
