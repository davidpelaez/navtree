class TestsController < ApplicationController
  
  before_filter :key_authenticate, :only => [:create]   

  # POST /tests 
  #All the headers arrive inside request.headers. It the ajax header define secret then HTTP_SECRET exists.
  # You can get secret as request.headers["HTTP_SECRET"]
  #request.headers["HTTP_TAB_PARENTEDGEID"]
  #request.headers["HTTP_TAB_URL"]
  #request.headers["HTTP_TAB_EXTRA"]
  def create 
    
    
  end
end
