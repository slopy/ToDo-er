Rails.application.routes.draw do

  root to: 'application#angular'

  devise_for :users
  get 'loggedin', to: 'users#loggedin'
  put 'users', to: 'users#update'
  delete 'users', to: 'users#delete'

  resources :goals 
  get 'active_change/:id', to: 'goals#toggleActive'
  get 'done_change/:id', to: 'goals#toggleDone'


end
