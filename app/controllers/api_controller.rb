class ApiController < ApplicationController 

    respond_to :json
    
    before_filter :authenticate_user!

    after_filter :set_csrf_cookie_for_ng

    private

    def set_csrf_cookie_for_ng
        cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    end

    def verified_request?
        super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
    end
    
end