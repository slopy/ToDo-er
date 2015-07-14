Rails.application.routes.draw do

  root to: 'application#angular'
  devise_for :users

    namespace :api do
        namespace :v1 do

            devise_for :users
            get 'loggedin', to: 'users#loggedin'
            put 'users', to: 'users#update'
            delete 'users', to: 'users#delete'

            resources :goals 
            get 'active_change/:id', to: 'goals#toggleActive'
            get 'done_change/:id', to: 'goals#toggleDone'

        end
    end


end
