Geocoder.configure do |config|
  # geocoding service (see below for supported options):
  config.lookup = :google

  # geocoding service request timeout, in seconds (default 3):
  config.timeout = 3

  # set default units to kilometers:
  config.units = :km
end
