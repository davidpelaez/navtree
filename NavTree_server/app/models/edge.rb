class Edge < ActiveRecord::Base 
  #This is a way to link relations to users without providing any direct link 
  #to the user information for privacy issues  
  belongs_to :secret
  
  #The origin of the edge is map as a NODE
  belongs_to :node
  
  has_ancestry #This adds the tree inteligence

  #This makes the edge as a node in the tree, so that it can interact with processing
  def as_json(options={})
    { :id => self.id, :url => self.node.url , :root => self.is_root?, :parent => self.parent , :extra => self.extra, :date => self.created_at.to_i }
  end

end
