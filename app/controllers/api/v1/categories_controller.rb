class Api::V1::CategoriesController < ApiController

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
        category = Category.where(title: params[:id]).first
        if !category.nil? && category.destroy!
            respond_with :json => {}, status: 200
        else
            respond_with :json => {}, status: 422
        end
    end

    private 

    def category_params
        params.require(:category).permit(:name)
    end 
end
