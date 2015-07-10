// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require fancybox
//= require angular
//= require angular-ui-router
//= require angular-rails-templates
//= require angular-devise
//= require_tree .


$(document).on('page:change', function() {

  $("a.fancybox").click(function() {
    $.fancybox.open([{ 
      href : '#add-goal-form',
      title: "<h3 class='text-center'>Add mew Goal!</h3><br/>",
      helpers : { 
        title : {
          type: 'inside',
          position: 'top'
        }
      },
    }]);
  }) // end of click

}); // end of page:change