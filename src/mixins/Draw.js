import Settings from '../settings.js'

export default {
	data: function() {
		return Settings.image
	},
	computed: {
		L: function() {
			return this.l * this.nL + (this.nL - 1) * this.padding
		},
		H: function() {
			return this.h * this.nH + (this.nH - 1) * this.padding
		}
	},
	methods: {
		coords: function(p1, p2) {
			let coords = []
			if ( undefined !== p1 ) {
				coords.push(this.L/2 + p1.x * (this.l + this.padding) )
				coords.push(this.H/2 + p1.y * (this.h + this.padding) )
			}
			if ( undefined !== p2 ) {
				coords.push(this.L/2 + p2.x * (this.l + this.padding) )
				coords.push(this.H/2 + p2.y * (this.h + this.padding) )
			}

			return coords
		}
	}
}