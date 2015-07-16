class Api::V1::CategoriesController < ApplicationController

    def index
        categories = Category.all
        respond_with categories
    end

    def create
        category = Category.where(category_params).first_or_initialize
        if category.save
            render :json => category, status: 200
        else
            render :json => {:errors => category.errors, :goal => goal }, status: 422
        end
    end

    def destroy
        category = Category.find(params[:id])
        category.destroy!
        respond_with :nil
    end

    private 

    def category_params
        params.require(:category).permit(:name)
    end 
end
