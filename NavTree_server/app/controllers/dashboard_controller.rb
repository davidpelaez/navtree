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
    end
  end
  
  #Return the complete navtree of current_user according to the requested format
  def navtree
    @edges = Edge.all(:conditions => {:secret_id => current_user.secret.id} )
    target = Tempfile.new("navtree_#{current_user.secret.id}_")
    target.write(@edges.to_json(:include => :node))
    target.close
    target.open
    respond_to do |format|
      format.json  {                                   
        #render :file => target.path, :type=>"application/json"   
        send_file target.path, :type => "application/json"#, :x_sendfile => true
        
        }
    end
  end
  
end
