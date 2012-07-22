class MapController < ApplicationController

  layout "application"

  def index
  end

  def geocode
    position = Geocoder.coordinates(params[:query])
    respond_to do |wants|
      wants.json { render :json => position }
    end
  end

end
