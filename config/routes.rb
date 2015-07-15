Rails.application.routes.draw do

  root to: 'application#angular'
  devise_for :users

    namespace :api do
        namespace :v1 do

            put 'users', to: 'users#update'
            delete 'users', to: 'users#delete'
            devise_for :users

            resources :goals 
            get 'active_change/:id', to: 'goals#toggleActive'
            get 'done_change/:id', to: 'goals#toggleDone'

        end
    end


end
