class UsersController < ApplicationController

  respond_to :json

  def index
    @users = @user.nearbys(params[:radius])#.each &:reverse_geocode
    respond_with @users
  end

  def update
    point = User.rgeo_factory_generator.point(params[:user][:longitude], params[:user][:latitude])
    @user.update_attributes position: point
    respond_with @user
  end

end
