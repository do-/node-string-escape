const esc = require ('../')

test ('tsv', () => {

	const TSV = new esc (Object.entries ({
		'\t': '\\t',
		'\n': '\\n',
		 "'": "''",
	}))

	expect (TSV.escape ('')).toBe ('')

	expect (TSV.escape (`You
don't`)).toBe ("You\\" + "ndon''t")

})
