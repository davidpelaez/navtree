class ChangeUrlToText < ActiveRecord::Migration
  def self.up  
    change_column :nodes, :url, :text
  end

  def self.down
  end
end
