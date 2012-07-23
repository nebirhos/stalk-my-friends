class User < ActiveRecord::Base
  attr_accessible :address, :position, :name

  self.rgeo_factory_generator = RGeo::Geographic.simple_mercator_factory

  def nearbys(radius)
    radius = radius.to_i*1000
    User.where( "ST_Distance(position, ?, false) <= ? ",
                position, radius ).where("id <> ?", id)
  end

  def as_json(options={})
    super.as_json(options).merge({:latitude => position.y, :longitude => position.x})
  end
end
