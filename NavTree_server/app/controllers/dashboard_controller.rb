class DashboardController < ApplicationController 
  layout 'navtree'
  #This is used to manage the dashboard of the user and the different functions that might be important for him
  before_filter :authenticate
  # GET /stats
  # GET /stats.xml
  def index
    @secret = current_user.secret
    @edges = Edge.all(:conditions => {:secret_id => current_user.secret.id},:order => "created_at DESC" ).paginate :per_page => 100, :page => params[:page]


    respond_to do |format|
      format.html # index.html.erb
    end
  end
  
  #Return the complete navtree of current_user according to the requested format
  def navtree
    if params[:span].nil? #If there's no time span
      @edges = Edge.secret(current_user.secret.id)
    else #Otherwise get the indicated amount of days before today  
      @days = params[:span].to_i.days
      @edges = Edge.secret(current_user.secret.id).range(Date.today-@days,Date.today)
      
    end
    #target = Tempfile.new("navtree_#{current_user.secret.id}_") 
    target_path =    "#{RAILS_ROOT}/tmp/navtree_#{current_user.secret.id}_#{Process.pid}"
    target = File.open(target_path, 'w') 
    #{RAILS_ROOT}/tmp/navtree_#{current_user.secret.id}_#{Process.pid}
    @edges.each do |edge|
      target.write(edge.to_json + "\n")      
    end

    target.close
    #target.open     
    respond_to do |format|
      format.json  {                                   
        #render :file => target.path, :type=>"application/json"   
        send_file target_path, {:type => "application/json",  :filename => "navtree_#{current_user.id}-#{Time.now.to_i}.json"}  #, :x_sendfile => true
        
        }
    end
  end
  
end
