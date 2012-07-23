names = %w[Tom Mark Ann Thomas Frank Ciccio]

User.create! name: "Silvia", position: User.rgeo_factory_generator.point(10.7306285, 43.887685)
100_000.times do |i|
  lat = rand * (47-35) + 35     # Italy
  lng = rand * (18-6) + 6       # Italy
  name = "#{names.sample}#{i}"
  u = User.new name: name, position: User.rgeo_factory_generator.point(lng, lat)
  u.save(validate: false)
end
