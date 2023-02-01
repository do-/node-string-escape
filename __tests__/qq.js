const esc = require ('../')

test ('qq', () => {

	const QQ = new esc (Object.entries ({'"': '""'}))

	expect (QQ.escape ('')).toBe ('')

	expect (QQ.escape ('no')).toBe ('no')

	expect (QQ.escape ('" a " b "')).toBe ('"" a "" b ""')

})
