class Api::V1::HomeController < ApiController
    before_action :authenticate_user!
    
    def home
    end
end
