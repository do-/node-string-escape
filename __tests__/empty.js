const esc = require ('../')

test ('nothing', () => {

	const ID = new esc ()

	expect (ID.escape ('')).toBe ('')

	expect (ID.escape ('Blah')).toBe ('Blah')

})
