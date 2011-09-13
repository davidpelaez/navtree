class TestsController < ApplicationController
  
  before_filter :key_authenticate, :only => [:create]   

  # POST /tests 
  #All the headers arrive inside request.headers. It the ajax header define secret then HTTP_SECRET exists.
  # You can get secret as request.headers["HTTP_SECRET"]
  def create        

      #Find the parent
      unless request.headers["HTTP_TAB_EDGEID"] == "null" then
        @parent_edge =  nil
      end        
      puts request.headers["HTTP_TAB_URL"]
      
      #Search the url as a node, otherwise create it.
        #Link the node to the secret
      #Build and Link the edge to the parent and to the node 
      #{:parent_id => request.headers["HTTP_TAB_EDGEID"],                  :node_url => request.headers["HTTP_TAB_URL"],                   :secret_id => @secret.id, :extra => request.headers["HTTP_TAB_EXTRA"]  }
      
      #If saved then 
         

      #debugger unless params[:syncing].to_i == 0    

      
      render :json => @secret.nodes.first.to_json
  end
end
