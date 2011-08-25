class CreateSecrets < ActiveRecord::Migration
  def self.up
    create_table :secrets do |t|
      t.string :code
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :secrets
  end
end
