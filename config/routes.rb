Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:edit, :update]
<<<<<<< HEAD
=======
  resources :groups,only: [:index, :new, :create, :edit, :update]
>>>>>>> parent of 33e5fb8... Revert "edit side bar"
end 
