(function (document, prettyPrint) {
	if ( !prettyPrint ) {
		return;
	}

	var className  = 'prettyprint',
			classMatch = new RegExp('\\b'+className+'\\b'),
			pres       = document.getElementsByTagName('pre');

	for (var i=0, l=pres.length; i<l; i++) {
		pres[i].className += className;
	}

	prettyPrint();

	for (var i=0, l=pres.length; i<l; i++) {
		pres[i].className = pres[i].className.replace(classMatch, '');
	}
})(document, window.prettyPrint);
