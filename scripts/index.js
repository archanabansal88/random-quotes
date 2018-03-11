var config = {
	BASE_URL: 'https://api.forismatic.com/api/1.0/',
};

var Utility = (function() {
	function makeAjaxRequest(url) {
		return $.ajax({
			url: url,
			jsonp: 'jsonp',
			dataType: 'jsonp',
			data: {
				method: 'getQuote',
				lang: 'en',
				format: 'jsonp',
			},
		});
	}
	return {
		ajaxRequest: makeAjaxRequest,
	};
})();

(function() {
	var RandomQuotes = function(context, container) {
		this.context = context;
		this.container = container;
		this.init();
	};

	RandomQuotes.prototype.init = function() {
		this.attachEvent();
		this.handleClick();
	};

	RandomQuotes.prototype.attachEvent = function() {
		this.context.on('click', this.handleClick.bind(this));
	};

	RandomQuotes.prototype.handleClick = function() {
		Utility.ajaxRequest(config.BASE_URL)
			.done(this.handleResponse.bind(this))
			.fail(function(err) {
				console.log('Error: ' + err.status);
				$('.quote').html('Whoops... try again!'); // in case json doesn't load
			});
	};

	RandomQuotes.prototype.handleResponse = function(data) {
		var temp = `<div class = 'quoteText'>"${data.quoteText}</div><div class = 'author'>- ${data.quoteAuthor}</div>`;
		this.container.find('.quotes').html(temp);
	};

	window.RandomQuotes = RandomQuotes;
})();

(function() {
	new RandomQuotes($('#quoteButton'), $('#quoteContainer'));
})();
