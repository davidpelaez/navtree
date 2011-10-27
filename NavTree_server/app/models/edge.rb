class Edge < ActiveRecord::Base         
  
  named_scope :range, lambda { |from,to| { :conditions => ["created_at between ? and ?",from, to] } }
    named_scope :secret, lambda { |secret_id| { :conditions => {:secret_id => secret_id} } }
  #This is a way to link relations to users without providing any direct link 
  #to the user information for privacy issues  
  belongs_to :secret
  
  #The origin of the edge is map as a NODE
  belongs_to :node
  
  has_ancestry #This adds the tree inteligence 
  
  #Convert the list of the children to a comma separated string of the ids of the children
  def children_to_s            
    result = ""
    self.children.each do |child|
      result = result + ", " unless result == "" #Append the comma, unless it's the beginning  
      result = result + child.id.to_s
    end
    return result    
  end

  #This makes the edge as a node in the tree, so that it can interact with processing
  def as_json(options={}) 
    parent = self.parent
    parent = self.parent.id unless self.parent.nil?
    { :id => self.id, :url => self.node.url , :root => self.is_root?, :parent => parent ,    
      :extra => self.extra, :date => self.created_at.to_i,    
      :has_children => self.has_children?, :children => self.children_to_s,              
      :branching => self.children.count, :depth => self.depth}
  end

end
