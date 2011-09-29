# encoding: utf-8
class EdgesController < ApplicationController 
  
  before_filter :authenticate, :except => [:create]
  before_filter :key_authenticate, :only => [:create]
  protect_from_forgery   :except => [:create]


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
    if request.headers["HTTP_X_TAB_URL"].nil? || request.headers["HTTP_X_TAB_URL"] == "null" then
      node_url = ""
    else
      node_url = Base64.decode64(request.headers["HTTP_X_TAB_URL"])
    end
    @node = Node.find_by_url node_url
    if @node.blank? then
      @node = Node.create(:url => node_url )         
    end 
    


    #Build and Link the edge to the parent and to the node 
    @edge = Edge.new
    @edge.secret = @secret
    @edge.node = @node

    @edge.title = Base64.decode64(request.headers["HTTP_X_TAB_TITLE"]) unless  request.headers["HTTP_X_TAB_TITLE"].nil? || request.headers["HTTP_X_TAB_TITLE"] == "null"      

    #Find the parent
    unless request.headers["HTTP_X_TAB_PARENTEDGEID"] == "null" then
      puts "Parent: " + request.headers["HTTP_X_TAB_PARENTEDGEID"]
      @parent_edge =  Edge.find(request.headers["HTTP_X_TAB_PARENTEDGEID"].to_i)
      block_access unless @parent_edge.secret == @secret #Security measure   
      @edge.parent =   @parent_edge
    end             
    


       
    @edge.extra = request.headers["HTTP_X_TAB_EXTRA"]
    
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
