class AddAncestryNNodeToEdge < ActiveRecord::Migration
  def self.up
    add_column :edges, :node_id, :integer
    add_column :edges, :ancestry, :string
  end

  def self.down
    remove_column :edges, :ancestry
    remove_column :edges, :node_id
  end
end
