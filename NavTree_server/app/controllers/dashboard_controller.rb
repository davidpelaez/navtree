class DashboardController < ApplicationController 
  
  #This is used to manage the dashboard of the user and the different functions that might be important for him
  before_filter :authenticate
  # GET /stats
  # GET /stats.xml
  def index
    @secret = current_user.secret
    @edges = Edge.all(:conditions => {:secret_id => current_user.secret.id} ).paginate :per_page => 20, :page => params[:page]
    @recent_edges = Edge.all(:limit => 5, :order => "created_at DESC")

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @nodes }
    end
  end
end
