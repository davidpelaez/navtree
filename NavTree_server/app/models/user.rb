class User < ActiveRecord::Base
  include Clearance::User
  
  has_one :secret
  
  after_create :create_secret
  
  def create_secret
    Secret.create!(:user => self)
  end
end
