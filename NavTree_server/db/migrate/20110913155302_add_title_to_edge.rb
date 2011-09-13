class AddTitleToEdge < ActiveRecord::Migration
  def self.up
    add_column :edges, :title, :string
  end

  def self.down
    remove_column :edges, :title
  end
end
