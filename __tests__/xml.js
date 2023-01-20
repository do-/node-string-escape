const esc = require ('../')

test ('xml', () => {

	const XML_TEXT = new esc ([
		['<', '&lt;'],
		['>', '&gt;'],
		['&', '&amp;'],
	])

	expect (XML_TEXT.escape ('txt')).toBe ('txt')
	expect (XML_TEXT.escape ('<!-- & -->')).toBe ('&lt;!-- &amp; --&gt;')

})