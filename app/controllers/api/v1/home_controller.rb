class Api::V1::HomeController < ApplicationController
    before_action :authenticate_user!
    
    def home
    end
end
