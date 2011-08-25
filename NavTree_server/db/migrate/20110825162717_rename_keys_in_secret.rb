class RenameKeysInSecret < ActiveRecord::Migration
  def self.up  
    change_table :secrets do |t|
      t.rename :private, :private_key
      t.rename :public, :public_key
    end
  end

  def self.down
  end
end
