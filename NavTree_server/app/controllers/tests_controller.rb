class TestsController < ApplicationController

  # POST /tests 
  #All the headers arrive inside request.headers. It the ajax header define secret then HTTP_SECRET exists.
  # You can get secret as request.headers["HTTP_SECRET"]
  def create   
      @secret = Secret.find_by_private_key( request.headers["HTTP_SECRET"])  
      @edge = {:parent_id => request.headers["HTTP_TAB_EDGEID"],    
                :node_url => request.headers["HTTP_TAB_URL"],   
                :secret_id => @secret.id, :extra => request.headers["HTTP_TAB_EXTRA"]  }
      
      debugger
#      debugger unless params[:syncing].to_i == 0
      
      render :json => @secret.nodes.first.to_json
  end
end
