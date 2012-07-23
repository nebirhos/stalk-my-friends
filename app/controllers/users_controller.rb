class UsersController < ApplicationController

  respond_to :json

  def index
    @users = @user.nearbys(params[:radius])#.each &:reverse_geocode
    respond_with @users
  end

  def update
    @user.update_attributes params[:user]
    respond_with @user
  end

end
