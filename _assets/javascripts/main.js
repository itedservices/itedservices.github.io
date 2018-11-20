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
    
        var zendesk = new $.RestClient('https://ited.zendesk.com/api/v2/help_center/');

        zendesk.add('articles');
    
        zendesk.articles.read(
            {sort_by: 'updated_at'},
            {sort_order: 'desc'}
        ).done(function (data) {
            
            var article_html = '';
            
            // we can have random articles
            // shuffle(data.articles);
            
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

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function contactForm() {
    
    var form = $("#contactform");
    // Catch the contact form submission
    form.submit(function(event) {
        
        var msgdata = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "https://ited-site.herokuapp.com/user/f3e1e41f-0a86-4f20-9d73-9daaa32f30b6",
            data: msgdata,
            beforeSend: function() {
                console.log("sending msg");
                // console.log(msgdata);
                $('#submit').button('loading').prepend('<i class="fas fa-spinner fa-spin"></i> ');
            }
        }).success(function(response) {
            console.log("msg sent");
            form.fadeOut().before('<div class="alert alert-success" role="alert"><p>Your message has been sent.</p><p>Thanks for contacting us, we\'ll be in touch soon</div>');
        }).fail(function(response) {
            console.log('error sending msg');
            form.after('<div class="alert alert-danger" role="alert"><p>Sorry,there was a problem sending your message. Please try emailing us directly</p></div>');
            $('#submit').button('reset');
        });
        return false;
    });
}


