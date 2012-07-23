names = %w[Tom Mark Ann Thomas Frank Ciccio]

User.create! name: "Silvia", latitude: 43.887685, longitude: 10.7306285
100_000.times do |i|
  lat = rand * (47-35) + 35     # Italy
  lng = rand * (18-6) + 6       # Italy
  name = "#{names.sample}#{i}"
  u = User.new name: name, latitude: lat, longitude: lng
  u.save(validate: false)
end
