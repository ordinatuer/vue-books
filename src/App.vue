<template>
	<div id="app">
		<div id="componentsWrap">
			<TeilForm v-bind:teil="teilInForm" v-on:subsay="sayData" />
			<div id="mapId"></div>
			<svg :id="canvasId"
				xmlns="http://www.w3.org/2000/svg"
				:viewBox="'0 0 ' + L + ' ' + H"
				v-on:click="testClick"
			>
				<rect v-bind:width="L" v-bind:height="H" fill="white" x="0" y="0"></rect>
				<SvgLine v-for="line in lines" v-bind:line="line" />
				<SvgTeil v-for="teil in teils" v-bind:teil="teil" />
			</svg>
		</div>
	</div>
</template>

<script>
import TeilForm from './components/TeilForm.vue'
import SvgLine from './components/SvgLine.vue'
import SvgTeil from './components/SvgTeil.vue'

import Draw from './mixins/Draw.js'

export default {
	name: 'app',
	components: {
		TeilForm,
		SvgLine,
		SvgTeil
	},
	mixins:[Draw],
	data: function() {
		return {
			imgSrc: 'http://joo25.loc/img/',
			mapId: 'mapId',
			canvasId: 'svgId',
			api: {
				line: {
					url: 'http://joo25.loc/lines',
					count: null,
					current: 1,
					data: 'lines',
					load: false
				}, 
				teil: {
					url: 'http://joo25.loc/teils',
					count: null,
					current: 1,
					data: 'teils',
					load: false
				}
			},
			lines: [],
			teils: [],
			teilInForm: {}
		}
	},
	mounted: function() {
		this.bounds = [[0, 0], [this.L, this.H]]
		
		this.map = L.map('mapId')

		this.map.fitBounds(this.bounds)
		this.map.setMaxBounds(this.bounds)
		this.map.setMinZoom(1)
		this.map.setMaxZoom(5)

		this.svgBlock = document.getElementById(this.canvasId)

		L.svgOverlay(
			this.svgBlock,
			this.bounds,
			{
				interactive: true
			}
		).addTo(this.map)

		this.canvas = SVG(this.canvasId)

		this.getData(this.api.line)
	},
	methods: {
		sayData: function(data) {
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
		},
		testClick: function(e) {
			let _this = this
			let el = e.target

			// api data id (teil_id)
			let id = el.getAttribute('data-mark')

			// number in App.data.[lines/teils] 
			let modelId = el.getAttribute('data-model-id')

			// attribute id of svg tags
			let domId = el.getAttribute('id')

			if ( id && modelId ) {
				console.log('Ok')
				_this.teilInForm = _this.teils[modelId]

				_this.teilInForm.domId = domId
				_this.teilInForm.modelId = modelId
			} else {
				//console.log('Не то! Не то')
			}

			let L = this.lines.pop()

			L.lineFrom.x += 1
			L.lineFrom.y += 1

			L.lineTo.x += 1
			L.lineTo.y += 1
			
			this.lines.push(L)
		}
	},
	watch: {
		lines: function() {
			if ( this.api.line.load) {
				//console.log('line already loaded')
				return
			}

			if ( this.api.line.current <= this.api.line.count || null === this.api.line.count ) {
				this.getData(this.api.line)
			} else {
				//console.log('Lines load: ' + this.lines.length)
				//this.drawLines()

				this.api.line.load = true
				this.getData(this.api.teil)
			}

			//console.log('lines watch')
		},
		teils: function() {
			if ( this.api.teil.load ) {
				return
			}

			if ( this.api.teil.current <= this.api.teil.count || null === this.api.teil.count ) {
				this.getData(this.api.teil)
			} else {
				//console.log('Teils load: ' + this.teils.length)
				this.api.line.teil = true
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