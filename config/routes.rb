Rails.application.routes.draw do
            devise_for :users 

  root to: 'application#angular'

    namespace :api do
        namespace :v1 do


            put 'users', to: 'users#update'
            delete 'users', to: 'users#destroy'
            devise_for :users 
            resources :goals 
            get 'active_change/:id', to: 'goals#toggleActive'
            get 'done_change/:id', to: 'goals#toggleDone'

        end
    end


end
