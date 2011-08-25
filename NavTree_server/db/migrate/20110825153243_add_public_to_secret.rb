class AddPublicToSecret < ActiveRecord::Migration
  def self.up
    add_column :secrets, :public, :integer
  end

  def self.down
    remove_column :secrets, :public
  end
end
