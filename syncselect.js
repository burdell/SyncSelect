(function ( $ ) {
	var source;
	function buildSource(userSource){
		var sourceObj = {};
		$.each(userSource, function(i, option){
			var text = option instanceof String ? option : option.Text || option.text;
			var value = option.Value === undefined ? text : option.Value || option.value;
			sourceObj[value] = {text: text, value: value};
		});
		return sourceObj;
	}

	function syncSelects(selectLists, $changedSelect, previousValue){
		var optionToAdd = source[previousValue];
		var optionToRemove = source[$changedSelect.val()];

		$.each(selectLists, function(i, selectList){
			if (selectList != $changedSelect[0]){
				var $selectList = $(selectList);
				if (optionToRemove)
					removeOption(optionToRemove.value, $selectList);
				if (optionToAdd)
					$selectList.append(new Option(optionToAdd.text, optionToAdd.value));
			} 
		});

	}

	function removeOption(value, $selectList){
		var options = $selectList.find('option');
		for (var i=0; i<options.length; i++){
			var $option = $(options[i]);
			if ($option.val() == value){
				$option.remove();
				return;
			}
		}
	}

	var methods = {
		init: function(options){
			source = buildSource(options.source);
			this.defaultOption = {text: options.defaultText || "--", value: undefined } 

			var self = this;
			$.each(this, function(i, selectList){
				var $selectList = $(selectList);
				$selectList.append(new Option(self.defaultOption.text))
				$.each(source, function(i, option){
					$(selectList).append(new Option(option.text, option.value));
				});
				
				var previousValue = $selectList.val();
				$selectList.on('change', function(e){
					syncSelects(self, $selectList, previousValue, source);
					previousValue = $selectList.val();
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