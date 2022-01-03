const assert = require ('assert')
const esc    = require ('../')

const XML_TEXT = new esc ([
	['<', '&lt;'],
	['>', '&gt;'],
	['&', '&amp;'],
])

assert.strictEqual (XML_TEXT.escape ('txt'), 'txt')
assert.strictEqual (XML_TEXT.escape ('<!-- & -->'), '&lt;!-- &amp; --&gt;')

const TSV = new esc (Object.entries ({
	'\t': '\\t',
	'\n': '\\n',
	 "'": "''",
}))

assert.strictEqual (TSV.escape (`You
don't`), "You\\" + "ndon''t")
