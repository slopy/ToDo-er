class Api::V1::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
          render :json => current_user, status: 200 if current_user
          return invalid_no_params_login_attempt if params[:user].empty?
          self.resource = warden.authenticate!(:scope => :user)
          return invalid_login_attempt unless resource
              
          if resource.valid_password?(sign_in_params[:password])
            clean_up_passwords(resource)
            sign_in(:user,resource)
            render :json => resource, status: 200
            
          return
      end
  end

  def sign_in_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def invalid_login_attempt
    warden.custom_failure!
    render :json => { :errors => ["Invalid email or password."] },  :success => false, :status => :unauthorized
  end

  def invalid_no_params_login_attempt
    warden.custom_failure!
    render :json => { :errors => ["Provide email and password"] },  :success => false, :status => :unauthorized
  end

  # def resource_name
  #   if user_signed_in?
  #     current_user.name
  #   else
  #     current_userr.class.name.underscore
  #   end
  # end
end
