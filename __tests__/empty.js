import esc from '../'

test ('nothing', () => {

	const ID = new esc ()

	expect (ID.escape ('')).toBe ('')

	expect (ID.escape ('Blah')).toBe ('Blah')

	expect (() => ID.set (0, 1)).toThrow ()
	expect (() => ID.set ('00', 1)).toThrow ()
	expect (() => ID.set ('0', 1)).toThrow ()

})
