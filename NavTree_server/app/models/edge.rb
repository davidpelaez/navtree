class Edge < ActiveRecord::Base 
  #This is a way to link relations to users without providing any direct link 
  #to the user information for privacy issues  
  belongs_to :secret
  
  #The origin of the edge is map as a NODE
  belongs_to :node
  
  has_ancestry #This adds the tree inteligence
  
end
