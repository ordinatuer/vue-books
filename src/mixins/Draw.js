export default {
	mounted: function () {

		//console.log('mix load')
	},
	data: function() {	
		let data = {
			h: 1500,
			l: 1000,
			nL: 65,
			nH: 15,
			padding: 200
		}
		let L = data.l * data.nL + (data.nL - 1) * data.padding
		let H = data.h * data.nH + (data.nH - 1) * data.padding

		data.L = L
		data.H = H
		
		return data
	},
	// data: function() {	
	// 	return {
	// 		h: 1500,
	// 		l: 1000,
	// 		nL: 65,
	// 		nH: 15,
	// 		padding: 200
	// 	}
	// },
	// computed: {
	// 	L: function() {
	// 		return this.l * this.nL + (this.nL - 1) * this.padding
	// 	},
	// 	H: function() {
	// 		return this.h * this.nH + (this.nH - 1) * this.padding
	// 	}
	// },
	methods: {
		drawLines: function() {
			this.lines.forEach(function( l ) {
				let line = this.coords(l.lineFrom, l.lineTo)

				this.canvas.line(line).stroke({width:20, color: "black"})
			}, this)
		},
		drawTeils: function() {
			this.teils.forEach(function( t, i ) {
				let map = [],
					type = (t.type) ? t.type : 1

				map[1] = 'rect'
				map[2] = 'circle'
				map[3] = 'image'

				if ( 1 === t.type || 2 === t.type || 3 === t.type ) {
					(this[map[type]])( t, i )
				}

			}, this)
		},
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
		},
		rect: function(teil, i) {
			let place,
				l, h,
				fill,
				f

			fill = (teil.fill) ? teil.fill : '#999'
			place = this.coords(teil)

			l = (1 === teil.l) ? this.l : this.h
			h = (1 === teil.h) ? this.h : this.l

			f = this.canvas.rect(l, h)

			if ( teil.r ) {
				f.radius(teil.r)
			}
			
			f.fill(fill).center( place[0], place[1] )
			f.attr({'data-mark': teil.teil_id})
			f.attr({'data-model-id': i})
			f.attr({'class': 'teil-rect'})

			this.text( teil, place )

		},
		circle: function(teil, i) {
			let place,
				r, fill, f

			place = this.coords(teil)
			r = this.h
			fill = (teil.fill) ? teil.fill : '#999'

			f = this.canvas.circle(r)
			f.fill(fill).center(place[0], place[1])
			f.attr({'data-mark': teil.teil_id})
			f.attr({'data-model-id': i})

			this.text(teil, place)
		},
		image: function(teil) {
			let place = this.coords(teil),
				//image = teil.image,
				ratio = 1,
				dx = 0,
				f

			f = this.canvas
				.image(this.imgSrc + teil.image)
				.loaded(loader => {
					ratio = loader.ratio
					dx = Math.ceil( (1 - ratio) * this.l/2 )
				})

			f.size(this.l * ratio, this.h)
			f.center(place[0] + dx, place[1])
			f.attr({'data-mark': teil.teil_id})
		},
		text: function(teil, place) {
			let srcText = teil.text.split('\n'),
				nText = srcText.length,
				text = '',
				i = 0

			text = this.canvas.text( function( str )  {
				while (i < nText ) {
					if ( 0 !== i ) {
						str.tspan(srcText[i]).newLine()
					} else {
						str.tspan(srcText[i])
					}
					i++
				}
			})

			text.font({
				size: teil.size,
				anchor: 'middle'
			}).move(place[0], place[1]-100*i)
		}
	}
}