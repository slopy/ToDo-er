class Api::V1::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    # return invalid_no_params_login_attempt if params[:user].empty?
        self.resource = warden.authenticate!(:scope => :user)
        
    if params[:user].present? && resource.valid_password?(sign_in_params[:password])
        return invalid_login_attempt unless resource
        clean_up_passwords(resource)
        sign_in(:user,resource) unless current_user
        render :json => resource, status: 200
    elsif current_user
        render :json => resource, status: 200
    else
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

end
