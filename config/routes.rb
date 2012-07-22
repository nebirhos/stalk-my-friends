StalkMyFriends::Application.routes.draw do
  get "geocode" => "map#geocode"

  root :to => 'map#index'
end
