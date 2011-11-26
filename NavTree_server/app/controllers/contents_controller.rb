class ContentsController < ApplicationController
  #Custom version of https://github.com/thoughtbot/high_voltage
  unloadable
    before_filter :ensure_valid, :except => [:download_extension]
    layout :layout_for_page, :except => [:download_extension]
        
    def show
      render :template => current_static_content
    end
    
    def download_extension
      @filename ="#{RAILS_ROOT}/public/extensions/NavTree_SafariV2.safariextz"
      send_file(@filename, :filename => "NavTree_SafariV2.safariextz")
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
              'navtree'
            end
          end 
end
