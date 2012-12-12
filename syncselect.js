(function ( $ ) {
	function buildSource(source){
		var sourceObj = {};
		$.each(source, function(i, option){
			var text = option instanceof String ? option : option.Text;
			var value = option.Value === undefined ? text : option.Value;
			sourceObj[value] = new Option(text, value);
		});
		return sourceObj;
	}

	var methods = {
		init: function(options){
			this.source = buildSource(options.source);
			var self = this;
			$.each(this, function(i, selectList){
				$.each(self.source, function(i, option){
					$(selectList).append(option);
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