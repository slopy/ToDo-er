
class Api::V1::UsersController < ApplicationController

    respond_to :json

    before_action :authenticate_user!, except: [:loggedin]

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

  def loggedin
    if signed_in?
      render :json => { user: current_user }, status: 200
    else
      render :json => {}, status: 422
    end
  end

  protected

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :current_password)
  end
end
