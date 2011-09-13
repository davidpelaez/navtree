class TestsController < ApplicationController
  
  before_filter :key_authenticate, :only => [:create]   

  # POST /tests 
  #All the headers arrive inside request.headers. It the ajax header define secret then HTTP_SECRET exists.
  # You can get secret as request.headers["HTTP_SECRET"]
  #request.headers["HTTP_TAB_PARENTEDGEID"]
  #request.headers["HTTP_TAB_URL"]
  #request.headers["HTTP_TAB_EXTRA"]
  def create 
    
    #debugger       

      #Search the url as a node, otherwise create it.
      @node = Node.find_by_url request.headers["HTTP_TAB_URL"]        
      if @node.blank? then
        @node = Node.create(:url => request.headers["HTTP_TAB_URL"] )         
      end 
      
          
      #Build and Link the edge to the parent and to the node 
      @edge = Edge.new
      @edge.secret = @secret
      @edge.node = @node

      #Find the parent
      unless request.headers["HTTP_TAB_PARENTEDGEID"] == "null" then
        puts "Parent: " + request.headers["HTTP_TAB_PARENTEDGEID"]
        @parent_edge =  Edge.find(request.headers["HTTP_TAB_PARENTEDGEID"].to_i)
        block_access unless @parent_edge.secret == @secret #Security measure   
        @edge.parent =   @parent_edge
      end               
      #request.headers["HTTP_TAB_EXTRA"]
      
      if @edge.save then 
         render :json => {:edge => {:id => @edge.id, :timestamp => @edge.created_at }}.to_json
      else
        
      end
  end
end
