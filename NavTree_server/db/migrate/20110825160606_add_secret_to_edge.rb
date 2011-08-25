class AddSecretToEdge < ActiveRecord::Migration
  def self.up
    add_column :edges, :secret_id, :integer
  end

  def self.down
    remove_column :edges, :secret_id
  end
end
