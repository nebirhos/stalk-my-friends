class MigrateToPostgis < ActiveRecord::Migration
  def up
    add_column :users, :position, :point, :geographic => true
    add_index :users, :position, :spatial => true
    # execute 'CREATE INDEX "index_users_on_position" ON "users" USING GIST ("position")'

    User.find_each do |u|
      u.position = User.rgeo_factory_generator.point(u.longitude, u.latitude)
      u.save!
    end

    remove_column :users, :latitude
    remove_column :users, :longitude
  end

  def down
    add_column :users, :latitude, :float
    add_column :users, :longitude , :float

    User.find_each do |u|
      u.update_attributes( :latitude => u.position.y, :longitude => u.position.x )
    end

    remove_column :users, :position
  end
end
