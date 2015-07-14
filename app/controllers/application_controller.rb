class ApplicationController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :exception

    respond_to :json

    before_action :configure_permitted_parameters, if: :devise_controller?

    after_filter :set_csrf_cookie_for_ng

    def angular
        render 'layouts/api/v1/application'
    end

    private

    def configure_permitted_parameters
        # devise_parameter_sanitizer.for(:sign_up) << :username
    end

    def set_csrf_cookie_for_ng
        cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    end

    def verified_request?
        super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
    end

end
