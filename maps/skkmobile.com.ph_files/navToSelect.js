(function ($) {
	"use strict";

	$.fn.navToSelect = function (options) {

		// Default settings
		var defaultOptions ={
			'select' : '', // String: css path to select tag
			'list'   : 'ul', // String: css path to menu list tag
			'item'   : 'li', // String: css path to menu list tag
			'active' : 'active', // String: Set the "active" class
			'header' : 'Main Navigation' // String: Specify text for "header" and show header instead of the active item
		};

		options = $.extend(defaultOptions, options);

		return this.each(function () {

			var nav = $(this),
				select = (options.select !== '')? $(options.select): $('<select/>').addClass("navToSelect");

			if (options.header !== '') {
				select.append(
					$('<option/>').text(options.header)
				);
			}

			// Build selectOptions
			var selectOptions = '';

			nav.find('a').each(function () {
				selectOptions += '<option value="' + $(this).attr('href') + '">';
				var j;
				for (j = 0; j < $(this).parents(options.item).length - 1; j++) {
					selectOptions += '- ';
				}
				selectOptions += $(this).text() + '</option>';
			});

			// Append selectOptions into a select
			select.append(selectOptions);

			// Change window location
			select.change(function () {
				window.location.href = $(this).val();
			});

			// Inject select if needed
			if (options.select === '')
			{
				nav.after(select);
			}

		});

	};
})(jQuery, 0);

