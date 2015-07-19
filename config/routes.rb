Rails.application.routes.draw do
            devise_for :users 

  root to: 'application#angular'

    namespace :api do
        namespace :v1 do

            get 'user_stats', to: 'users#get_stats'
            put 'users', to: 'users#update'
            delete 'users', to: 'users#destroy'
            devise_for :users 
            resources :goals 
            post 'goal/:id/upload_file', to: 'goals#upload_file'
            get 'goal/:id/destroy_file', to: 'goals#destroy_file'
            get 'active_change/:id', to: 'goals#toggleActive'
            get 'done_change/:id', to: 'goals#toggleDone'
            resources :categories 


        end
    end


end
