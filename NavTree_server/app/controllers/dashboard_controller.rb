class DashboardController < ApplicationController 
  
  #This is used to manage the dashboard of the user and the different functions that might be important for him
  before_filter :authenticate
  # GET /stats
  # GET /stats.xml
  def index
    @secret = current_user.secret

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @nodes }
    end
  end
end
