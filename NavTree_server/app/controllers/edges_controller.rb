class EdgesController < ApplicationController 
  
  before_filter :authenticate, :except => [:create]
  before_filter :key_authenticate, :only => [:create]
  # GET /edges
  # GET /edges.xml
  def index 
   @edges = Edge.all(:conditions => {:secret_id => current_user.secret.id} ).paginate :per_page => 20, :page => params[:page]

      

  
    

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @edges }
    end
  end

  # GET /edges/1
  # GET /edges/1.xml    
  #THIS IS FOR AJAX PURPOSES
  def show
    @edge = Edge.find(params[:id]) 
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @edge }
    end
  end  


  # POST /edges
  # POST /edges.xml
  def create
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

    @edge.title = request.headers["HTTP_TAB_TITLE"]
       
    @edge.extra = request.headers["HTTP_TAB_EXTRA"]
    
    if @edge.save then 
       render :json => {:edge => {:id => @edge.id, :timestamp => @edge.created_at }}.to_json
    else
        render :status => 501
    end
  end

  # PUT /edges/1
  # PUT /edges/1.xml
  def update
    @edge = Edge.find(params[:id])

    respond_to do |format|
      if @edge.update_attributes(params[:edge])
        format.html { redirect_to(@edge, :notice => 'Edge was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @edge.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /edges/1
  # DELETE /edges/1.xml
  def destroy
    @edge = Edge.find(params[:id])
    @edge.destroy

    respond_to do |format|
      format.html { redirect_to(edges_url) }
      format.xml  { head :ok }
    end
  end
  

end
