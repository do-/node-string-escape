const assert = require ('assert')

module.exports = class extends Map {

	set (k, v) {
	
		assert.strictEqual (typeof k, 'string')
		assert.strictEqual (k.length, 1, 'Mapping keys must be single chars, found: ' + k)
		
		assert.strictEqual (typeof v, 'string')
		
		return super.set (k.charCodeAt (0), v)
	
	}
	
	escape (s) {
	
		assert.strictEqual (typeof s, 'string')

		const {length} = s; if (length === 0) return s

		let result = '', from = 0, to = 0; while (to < length) {

			const c = s.charCodeAt (to); 
			
			if (!this.has (c)) {

				to ++

				continue

			}

			result += s.slice (from, to) + this.get (c)

			from = ++ to

		}

		if (from === 0) return s

		return result + s.slice (from)	

	}

}

