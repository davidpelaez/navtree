class ContentsController < ApplicationController
  #Custom version of https://github.com/thoughtbot/high_voltage
  unloadable
    before_filter :ensure_valid
    layout :layout_for_page
        
    def show
      render :template => current_static_content  #TODO: define layout
    end

    protected

          def ensure_valid
            unless template_exists?(current_static_content)
              render :nothing => true, :status => 404 and return false
            end
          end
    
          #STATIC PAGES ARE CASE INSENSITIVE
          def current_static_content
            "contents/#{params[:id].to_s.downcase}"
          end

          def template_exists?(path)
            view_paths.find_template(path, response.template.template_format)
          rescue ActionView::MissingTemplate
            false
          end 

          def layout_for_page
            case params[:id]
            when 'home'
              'home'
            else
              'application'
            end
          end 
end
