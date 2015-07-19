class ApplicationController < ActionController::Base

    protect_from_forgery with: :exception

    skip_before_filter :verify_authenticity_token

    def angular
        render 'layouts/api/v1/application'
    end

end
