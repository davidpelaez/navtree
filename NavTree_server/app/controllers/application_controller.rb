# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  include Clearance::Authentication
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password   
  
  private

  def block_access
    raise ActionController::Forbidden, "You're private key isn't valid or you requested an unauthorized action."   
    false
  end   
  
  #Find the secret using the key, otherwise reject.
  def key_authenticate    
    ##FOR UTF-8
    #request.headers["HTTP_X_TAB_URL"].force_encoding("UTF-8")  
    #request.headers["HTTP_X_TAB_EXTRA"].force_encoding("UTF-8")  
    #request.headers["HTTP_X_TAB_TITLE"].force_encoding("UTF-8")  
    #request.headers["HTTP_X_TAB_PARENTEDGEID"].force_encoding("UTF-8")   
    #request.headers["HTTP_X_SECRET"].force_encoding("UTF-8")  
    #END Encoding
     @secret = Secret.find_by_private_key( request.headers["HTTP_X_SECRET"]) 
     if @secret.blank?  then      block_access  end  
  end
end
