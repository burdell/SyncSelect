(function ( $ ) {
	function buildSource(source){
		var sourceObj = {};
		$.each(source, function(i, option){
			var text = option instanceof String ? option : option.Text || option.text;
			var value = option.Value === undefined ? text : option.Value || option.value;
			sourceObj[value] = {text: text, value: value};
		});
		return sourceObj;
	}

	var methods = {
		init: function(options){
			this.source = buildSource(options.source);
			this.defaultOption = {text: options.defaultText || "--", value: null } 
			
			var self = this;
			$.each(this, function(i, selectList){
				$(selectList).append(new Option(self.defaultOption.text, self.defaultOption.value))
				$.each(self.source, function(i, option){
					$(selectList).append(new Option(option.text, option.value));
				});
			});
		},
	}

	$.fn.syncSelect = function( method ){
		if ( methods[method] ) {
	  		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
	  		return methods.init.apply( this, arguments );
		} else {
	  		$.error( 'Method ' +  method + ' does not exist on jQuery.syncSelect' );
		}
	};
})( jQuery )