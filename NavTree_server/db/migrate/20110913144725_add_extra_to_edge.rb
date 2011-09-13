class AddExtraToEdge < ActiveRecord::Migration
  def self.up
    add_column :edges, :extra, :integer
  end

  def self.down
    remove_column :edges, :extra
  end
end
