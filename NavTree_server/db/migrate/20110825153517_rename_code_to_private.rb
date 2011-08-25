class RenameCodeToPrivate < ActiveRecord::Migration
  def self.up 
    change_table :secrets do |t|
      t.rename :code, :private
    end
  end

  def self.down
    change_table :secrets do |t|
      t.rename :private, :code
    end
  end
end
