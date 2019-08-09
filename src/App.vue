<template>
  <div id="app">
    <div id="componentsWrap">
      <TeilForm v-bind:teil="teilInForm" v-on:subsay="sayData" />
      <div id="mapId"></div>
    </div>
  </div>
</template>

<script>
import TeilForm from './components/TeilForm.vue'

import Draw from './components/Draw.js'

export default {
	name: 'app',
	components: {
		TeilForm
	},
	mixins:[Draw],
	data: function() {
		return {
			imgSrc: 'http://joo25.loc/img/',
			h: 1500,
			l: 1000,
			nL: 65,
			nH: 15,
			padding: 200,
			mapId: 'mapId',
			canvasId: 'svgId',
			api: {
			line: {
				url: 'http://joo25.loc/lines',
				count: null,
				current: 1,
				data: 'lines'
			}, 
			teil: {
				url: 'http://joo25.loc/teils',
				count: null,
				current: 1,
				data: 'teils'
			}
			},
			lines: [],
			teils: [],
			teilInForm: {}
		}
	},
	mounted: function() {
		this.map = L.map('mapId')

		let h = document.documentElement.clientHeight,
			l = document.documentElement.clientWidth
		console.log([l, h])

		this.map.fitBounds(this.bounds)
		this.map.setMaxBounds(this.bounds)
		this.map.setMinZoom(1)
		this.map.setMaxZoom(5)

		L.svgOverlay(
			this.svgBlock,
			this.bounds,
			{
				interactive: true
			}
		).addTo(this.map)

		this.canvas = SVG(this.canvasId)
		this.canvas.rect(this.L, this.H)
			.fill('white')

		this.getData(this.api.line)
	},
	methods: {
		sayData: function(data) {
			// console.log({
			// 	t: this.teils,
			// 	l: this.lines,
			// 	zoom: this.map.getZoom()
			// })
			//console.log('Say what!')
			console.log(this.teils[data].text)
		},
		getData: function(api) {
			let sb = this
			let page = api.current

			sb.$http.get(api.url + '?page=' + api.current)
			.then(response => {
				if (null === api.count) {
					api.count = +response.request.getResponseHeader("x-pagination-page-count")
				}
				api.current++
				sb[api.data] = sb[api.data].concat(response.data)
			})
			.catch(error => {
				console.log(error)
			})
		}
	},
	watch: {
		lines: function() {
			if ( this.api.line.current <= this.api.line.count || null === this.api.line.count ) {
				this.getData(this.api.line)
			} else {
				//console.log('Lines load: ' + this.lines.length)
				this.drawLines()

				this.getData(this.api.teil)
			}
		},
		teils: function() {
			if ( this.api.teil.current <= this.api.teil.count || null === this.api.teil.count ) {
				this.getData(this.api.teil)
			} else {
				//console.log('Teils load: ' + this.teils.length)
				this.drawTeils()
			}
		}
	}
}
</script>

<style src="../node_modules/leaflet/dist/leaflet.css"></style>
<style>
html, body {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}
#app,
#mapId,
#componentsWrap
{
	width: 100%;
	height: 100%;
	background-color: deepskyblue;
}
#mapId {
	background-color: #999;
}
</style>