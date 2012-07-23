class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :get_user

protected

  def get_user
    @user = User.find_by_name "Silvia"
  end
end
