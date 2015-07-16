class ApiController < ApplicationController 

    respond_to :json
    before_filter :authenticate_user!
    respond_to :json
    
end