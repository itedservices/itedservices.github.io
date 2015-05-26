(function($) {

// prettyPhoto
	jQuery(document).ready(function(){
		jQuery('a[data-gal]').each(function() {
			jQuery(this).attr('rel', jQuery(this).data('gal'));
		});  	
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',theme:'light_square',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
	}); 

		
})(jQuery);

function getHelpcenterArticles () {
    
    var helpcenter = $('#helpcenter');
    
    // only load article where there is a #helpcenter element
    if (helpcenter.length){
        console.log(helpcenter);
    
        var zendesk = new $.RestClient('https://ited.zendesk.com/api/v2/help_center/');

        zendesk.add('articles');
    
        zendesk.articles.read(
            {sort_by: 'updated_at'},
            {sort_order: 'desc'}
        ).done(function (data) {
            
            var article_html = '';
            
            // loop the articles and format the 5 latest
            $.each(data.articles, function(key, article){
                article_html += '<p><a target="_blank" href=' + article.html_url + '>' + article.name + '</a></p>';
                return key < 4;
            });
        
            // add the articles after the section header
            helpcenter.after(article_html);
        });
    }
}


