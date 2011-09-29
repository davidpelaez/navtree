class ChangeTitleToText < ActiveRecord::Migration
  def self.up   
        change_column :edges, :title, :text
  end

  def self.down
  end
end
