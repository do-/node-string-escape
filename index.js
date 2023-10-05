export default class extends Map {

	set (k, v) {

		if (typeof k !== 'string' || k.length !== 1) throw Error ('Mapping keys must be single chars, found: ' + k)
		if (typeof v !== 'string')                   throw Error ('Mapping values must be strings, found: ' + k)
					
		if (this.size === 0) {
		
			this.k = k
			this.v = v
			this.escape = this.escape1

		}
		else {

			this.escape = this.escapeN

		}
		
		return super.set (k.charCodeAt (0), v)
	
	}
	
	escape (s) {
	
		return s
	
	}
	
	escape1 (s) {

		const {length} = s; if (length === 0) return s
		
		const {k, v} = this

		let result = '', from = 0, to = 0; while (to < length) {

			to = s.indexOf (k, from); if (to < 0) break
			
			result += s.slice (from, to) + v

			from = ++ to

		}

		return result + s.slice (from)

	}
	
	escapeN (s) {
	
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