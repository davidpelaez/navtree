class ChangeAncestryType < ActiveRecord::Migration
  def self.up
    change_column :edges, :ancestry, :text, {:limit => nil}
  end

  def self.down
  end
end
