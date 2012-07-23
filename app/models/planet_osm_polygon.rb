class PlanetOsmPolygon < ActiveRecord::Base
  set_table_name :planet_osm_polygon
  set_primary_key :osm_id

  attr_protected

  self.rgeo_factory_generator = RGeo::Geos.factory_generator

  def users_here
    User.where("ST_INTERSECTS( ST_Transform(users.position::geometry, 900913), ?)", self.way);
  end
end
