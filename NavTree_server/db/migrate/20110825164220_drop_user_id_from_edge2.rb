class DropUserIdFromEdge2 < ActiveRecord::Migration
  def self.up  
    remove_column :edges, :user_id
  end

  def self.down
  end
end
