namespace :db do

  BACKUP_DIR = "db/backup"

  desc "Backup the database in #{BACKUP_DIR}."
  task :backup => [:environment] do
    Dir.mkdir BACKUP_DIR unless File.directory? BACKUP_DIR

    db_config = ActiveRecord::Base.configurations[ Rails.env ]
    backup_name = "#{db_config['database']}.dump"
    backup_file = File.join( BACKUP_DIR, backup_name )
    cmd = "pg_dump -U#{db_config['username']} -Fc #{db_config['database']} > #{backup_file}"

    if system( cmd )
      puts "Done!"
    else
      puts "Oh fuck..."
    end
  end

  desc "Restore the latest database dump in #{BACKUP_DIR}."
  task :restore => [:environment] do
    db_config = ActiveRecord::Base.configurations[ Rails.env ]
    backup_name = "#{db_config['database']}.dump"
    backup_file = File.join( BACKUP_DIR, backup_name )
    cmd = "pg_restore -U#{db_config['username']} -d#{db_config['database']} -c --no-owner #{backup_file}"

    if system( cmd )
      puts "Done!"
    else
      puts "oh fuck..."
    end
  end

end
