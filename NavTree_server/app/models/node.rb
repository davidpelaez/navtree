class Node < ActiveRecord::Base
  has_many :edges #This let's us see in how many graph relations the node is participating
  has_many :secrets, :through => :edges  #This allows us to calculate by how many people a single node is being used
  

end
