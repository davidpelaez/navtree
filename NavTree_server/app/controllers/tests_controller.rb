class TestsController < ApplicationController

  # POST /tests 
  #All the headers arrive inside request.headers. It the ajax header define secret then HTTP_SECRET exists.
  # You can get secret as request.headers["HTTP_SECRET"]
  def create   
      @secret = Secret.find(:private_key => request.headers["HTTP_SECRET"])
      debugger unless params[:syncing].to_i == 1
      render :text => "ok"
  end
end
