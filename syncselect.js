(function ( $ ) {
	var source = {};
	var methods = {
		init: function(options){
			buildSource(options.source);
			this.defaultOption = {text: options.defaultText || "--"} 

			var self = this;
			$.each(this, function(i, selectList){
				var $selectList = $(selectList);
				$selectList.append(new Option(self.defaultOption.text))
				$.each(source, function(i, option){
					$(selectList).append(new Option(option.text, option.value));
				});
				
				var previousValue = $selectList.val();
				$selectList.on('change', function(e){
					syncSelects(self, $selectList, previousValue);
					previousValue = $selectList.val();
				});
			});
		},
	}

	/******* 
		HELPER METHODS 
					*********/

	function buildSource(userSource){
		$.each(userSource, function(i, option){
			var text = option instanceof String ? option : option.Text || option.text;
			var value = option.Value === undefined ? text : option.Value || option.value;
			source[value] = {text: text, value: value, index: i};
		});
	}

	function syncSelects(selectLists, $changedSelect, previousValue){
		var optionToAdd = source[previousValue];
		var optionToRemove = source[$changedSelect.val()];

		$.each(selectLists, function(i, selectList){
			if (selectList != $changedSelect[0]){
				var $selectList = $(selectList);
				var options = $selectList.find('option');
				if (optionToRemove)
					removeOption(optionToRemove.value, options);
				if (optionToAdd)
					addOption(optionToAdd, options);
			} 
		});

	}

	function removeOption(value, options){
		for (var i=0; i<options.length; i++){
			var $option = $(options[i]);
			if ($option.val() == value){
				$option.remove();
				return;
			}
		}
	}

	function addOption(optionToAdd, options){
		//index in source object is 1 greater than actual index because default value isn't in source object
		var index = optionToAdd.index + 1;
		var $option = null;
		for (var i=1; i<options.length; i++){
			$option = $(options[i]);
			var optionObj = source[$option.val()];
			if (optionObj && index < optionObj.index) {
				$option.before(new Option(optionToAdd.text, optionToAdd.value));
				return;
			}
		}
		if ($option != null) {
			$option.before(new Option(optionToAdd.text, optionToAdd.value));		
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