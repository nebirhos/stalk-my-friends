StalkMyFriends::Application.routes.draw do
  get "geocode" => "map#geocode"

  resources :users, :only => [:update, :index]

  root :to => 'map#index'
end
