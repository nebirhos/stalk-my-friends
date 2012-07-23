class User < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude, :name

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode  # auto-fetch address
end
