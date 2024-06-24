var lightbox = new Class({

	Implements : Options,
	options: {
		selecter: 'a.lightbox', 
		overlay: true,
		opacity: .8,
		colour: 'rgb(138,144,150)',
		transition: 'sine:in', 
		duration: 1000
	},

	initialize: function(options) {
		this.setOptions(options);
		var self = this;
		
		self.index = 0;
		self.images = $$(self.options.selecter)
		
		self.images.each(function(image, index) {
			image.addEvents({
				'click': function(clk) { 
					clk.stop(); 
					self.index = index;
					self.open(this.get('href'));
				}
			});
		});
		
		window.addEvent('keyup', function(key) {
			if(key.code == 27 || key.code == 8) {
				self.close();
				return;
			}
		});
		
	},
	
	open: function(href) {
		var self = this;
		self.showOverlay();
		if(self.images.length > 1) {
			self.prev = new Element('a', { 
				'href': '#previous-image', 
				'html': 'Previous',
				'styles': {
					'position': 'fixed',
					'top':0, 'left': '-53px',
					'margin': '0 0 0 50%',
					'padding': '4px 10px',
					'border-radius': '0 0 0 5px',
					'z-index': 100,
					'background': 'rgba(255,255,255,0.8)'
				},
				'events': {
					'click': function(clk) {
						self.index = (self.index == 0) ? (self.images.length-1) : (self.index-1);
						self.image.fade(0.4).set('src', self.images[self.index].get('href')).fade(1);
					}
				}
			}).inject(document.body, 'bottom');
			self.next = new Element('a', {  
				'href': '#next-image', 
				'html': 'Next',
				'styles':  {
					'position': 'fixed',
					'top':0, 'left': '20px',
					'margin': '0 0 0 50%',
					'padding': '4px 10px',
					'border-radius': '0 0 5px 0',
					'z-index': 100,
					'background': '#ffffff'
				},
				'events': {
					'click': function(clk) {
						self.index = (self.index == (self.images.length-1)) ? 0 : (self.index+1);
						self.image.fade(0.4).set('src', self.images[self.index].get('href')).fade(1);
					}
				} 
			}).inject(document.body, 'bottom');
		}
		self.image = new Element('img', {
			src: href,
			styles: {
				'position': 'fixed',
				'top': Math.ceil((window.getHeight() / 2)) - 10,
				'left': Math.ceil((window.getWidth() / 2)) - 10,
				'box-shadow': '0 0 5px #dddddd', 
				'opacity': 0,
				'cursor': 'pointer',
				'background': '#ffffff'
			},
			events: {
				'load': function() {
					self.is_open = true;
					var width = this.getWidth(), height = this.getHeight(), top = Math.ceil((window.getHeight() / 2) - (height / 2));
					if(top < 0) top = 10;
					var position = (height > window.getHeight()) ? 'absolute' : 'fixed';
					this.set('width', 20).set('height', 20).setStyle('position', position).fade(1);
					self.image.fx = new Fx.Morph(this, {
						transition: self.options.transition,
						duration: self.options.duration, 
						onComplete: function() {
							if(self.is_open == true) {
								if(self.closelabel) {
									self.closelabel = new Element('img', {
										'src': 'https://ssl.gstatic.com/ui/v1/dialog/close-x.png',
										'styles': {
											'position': position,
											'top': (top - 5),
											'left': Math.ceil((window.getWidth() / 2) - (width / 2) + (width - 10)),
											'background': '#ffffff',
											'cursor': 'pointer',
											'padding': 4, 
											'box-shadow': '0 0 5px #000000',
											'border-radius': '8px', 
											'opacity': self.options.opacity
										},
										'events': {
											'click': function(clk) {
												clk.stop();
												self.close();
											}, 
											'mouseenter': function() {
												this.fade(1);
											}, 
											'mouseleave': function() {
												this.fade(self.options.opacity);
											}
										}
									}).inject(document.body, 'bottom');
								}
							}
						}
					}).start({
						'width': width, 'height': height, 
						'top': top,
						'left': Math.ceil((window.getWidth() / 2) - (width / 2))
					});
				},
				'click': function(clk) {
					clk.stop();
					self.close();
				}
			}
		}).inject(document.body, 'bottom');
	},
	
	close: function() {
		var self = this;
		if(self.is_open == true) {
			self.is_open = false;
			self.hideOverlay();
			if(self.image) {
				self.image.fx.start({
					'width': 0, 'height': 0,
					'top': Math.ceil((window.getHeight() / 2)),
					'left': Math.ceil((window.getWidth() / 2)),
					'opacity': 0
				});
				self.image = null;
				self.closelabel.dispose();
				self.next.dispose();
				self.prev.dispose();
			}
		}
	},
	
	showOverlay: function() {
		var self = this;
		if(self.options.overlay == true) {
			if(!self.options.overlay_el) {
				self.options.overlay_el = new Element('div', { 
					styles: {
						'position': 'fixed',
						'top': 0, 'left': 0, 'right': 0, 'bottom': 0, 
						'width':  window.getScrollSize().x + 'px',
						'height':  window.getScrollSize().y + 'px',
						'display': 'block',
						'background-color': this.options.colour,
						'opacity': 0,
						'cursor': 'pointer'
					},
					events: {
						'click': function() {
							self.close();
						}
					}
				}).inject(document.body, 'bottom');
			}
			self.options.overlay_el.fade(self.options.opacity);
		}
	},
	
	hideOverlay: function() {
		if(this.options.overlay == true && this.options.overlay_el) {
			this.options.overlay_el.fade('out');
		}
	},
	
});

window.addEvents({
	'load': function() {
		
		
		
	},
	'domready': function() {
		
		$$('form').each(function(form) {
			form.addEvent('submit', function() {
				_gaq.push(['_linkByPost', form]);
			});
		});
		$$('a[href$=.jpg],a[href$=.png],a[href$=.gif],a[href$=.pdf]').each(function(dl) {
			dl.addEvent('click', function(clk) {
				_gaq.push(['_trackEvent',  dl.get('href').substring(dl.get('href').length, dl.get('href').length-3).toUpperCase(), dl.get('href')]);
			});
		});
		
		new lightbox();
		
		
		$$('a.ajax-delete').each(function(a) { 
			new Request({
				url:a.get('href'), 
				link: 'chain', 
				onComplete: function() { 
					a.getParent().empty().set('html', 'Deleted');
				}
			}).send(); 
		}); 
		
		$$('a.ajax-delete').addEvent('click', function(clk) {
			clk.stop(); 
			alert('delete'); 
			var a = document.id(this); 
			a.getParent().empty().set('html', 'loading');
			new Request({
				url:a.get('href'), 
				onComplete: function() { 
					a.getParent().empty().set('html', 'Deleted');
				}
			}).send(); 
		}); 
		
		$$('a.ajax-delete').addEvent('click', function(clk) {
			clk.stop(); 
			var a = document.id(this); 
			a.getParent().empty().set('html', 'loading');
			new Request({
				url:a.get('href'), 
				onComplete: function() { 
					a.getParent().empty().set('html', 'Deleted');
				}
			}).send(); 
		}); 
	} 
});