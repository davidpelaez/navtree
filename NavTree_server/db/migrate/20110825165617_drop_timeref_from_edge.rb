class DropTimerefFromEdge < ActiveRecord::Migration
  def self.up    
     remove_column :edges, :timeref 
  end

  def self.down
  end
end
