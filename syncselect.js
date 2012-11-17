(function ( $ ) {
	function createSource(selectOptions){
		var source = {};
		$.each(selectOptions, function(i, option){
			var $option = $(option);
			if ($option.val() != ""){
				source[$option.val()] = $option.text(); 
			}
		});
		return source;
	}

	var methods = {
		init: function(){
			var selectOptions = this.eq(0).find('option');
			this.source = createSource(this.selectOptions);
			this.previousSelectedValue = null;
			console.log(this);
		},
		setSelected: function(value){
			$.each(this, function(i, selectList){
				var $options = $(selectList).find('option');
				$.each($options, function(i, option){
					var $option = $(option);
					if ($option.val() == value || $option.text() == value){
						$option.remove();
					}
				}); 
			});
		}
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