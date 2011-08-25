class Secret < ActiveRecord::Base  
  has_many :edges, :dependent => :destroy
  belongs_to :user 
  has_many :nodes, :through => :edges
  
  #The public integer behaves as a randomized ID so that external api calls cannot link any anonymous given info to a user
  #The private allows browser extensions to send information to the tree via ajax.
  #The id of the table is only used for internal behaviour, mappings and queries. It's not visible outside for security reasons.
  
  after_create :set_private_key
  
  def set_private_key
     self.private_key = Digest::SHA1.hexdigest(Time.now.to_s.split(//).sort_by{rand}.join)
     self.save
  end
end
