class AddTimerefToEdge < ActiveRecord::Migration
  def self.up
    add_column :edges, :timeref, :integer
  end

  def self.down
    remove_column :edges, :timeref
  end
end
