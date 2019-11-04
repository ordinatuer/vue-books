<template>
	<div id="app">
		<div id="componentsWrap">
			<TeilForm v-bind:teil="teilInForm"
				v-on:addTeil="addTeil"
				v-on:fixTeil="fixTeil"/>
			<div id="mapId"></div>
			<svg :id="canvasId"
				xmlns="http://www.w3.org/2000/svg"
				:viewBox="'0 0 ' + L + ' ' + H"
				v-on:click="testClick"
			>
				<rect v-bind:width="L" v-bind:height="H" fill="white" x="0" y="0"></rect>
				<SvgLine v-for="line in lines" v-bind:line="line" />
				<SvgTeil v-for="(teil, i) in teils" v-bind:teil="numTeil(teil, i)" />
			</svg>
		</div>
	</div>
</template>

<script>
import TeilForm from './components/TeilForm.vue'
import SvgLine from './components/SvgLine.vue'
import SvgTeil from './components/SvgTeil.vue'
const qs = require('querystring')
const apiServer = 'http://45.8.228.95'

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
			mapId: 'mapId',
			canvasId: 'svgId',
			api: {
				line: {
					url: apiServer + '/lines',
					count: null,
					current: 1,
					data: 'lines',
					load: false
				}, 
				teil: {
					url: apiServer + '/teils',
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
		this.map.setMaxZoom(7)

		let canvas = document.getElementById(this.canvasId)

		L.svgOverlay(
			canvas,
			this.bounds,
			{
				interactive: true
			}
		).addTo(this.map)

		this.getData(this.api.line)
	},
	methods: {
		numTeil: function(teil, i) {
			teil.i = i
			return teil
		},
		addTeil: function(newData, formData) {
			if (newData) {
				this.teils.push(newData)

				let data = formData

				this.$http({
					method: 'post',
					url: this.api.teil.url,
					data: data,
					headers: {
						'Content-type': 'multipart/form-data'
					}
				})
				.then(response => {
					//console.log(response)
				})
				.catch(error => {
					//console.log(error)
				})
			} else {
				//console.log('Empty - Пусто')
			}
		},
		fixTeil: function(id, newData) {
			if(id) {
				let i = this.teils[id].teil_id


				this.$http({
					method: 'PATCH',
					url: this.api.teil.url + '/' + i,
					data: qs.stringify(newData),
					headers: {
						'Content-type': 'application/x-www-form-urlencoded'
					}
				})
				.then(response => {
					console.log(response)
				})
				.catch(error => {
					console.log(error)
				})
			} else {
				console.log('Empty - Пусто | fixData')
			}
		},
		addNewTeil: function() {

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
				//console.log(error)
			})
		},
		testClick: function(e) {
			let _this = this
			let el = e.target

			// api data id (teil_id)
			let id = el.getAttribute('data-api-id')

			// number in App.data.[lines/teils] 
			let modelId = el.getAttribute('data-model-id')

			// attribute id of svg tags
			//let domId = el.getAttribute('id')

			if ( modelId ) {
				_this.teilInForm = _this.teils[modelId]

				_this.teilInForm.modelId = modelId
			} else {

			}
		}
	},
	watch: {
		lines: function() {
			if ( this.api.line.load) {
				return
			}

			if ( this.api.line.current <= this.api.line.count || null === this.api.line.count ) {
				this.getData(this.api.line)
			} else {
				this.api.line.load = true
				this.getData(this.api.teil)
			}
		},
		teils: function() {
			console.log( 'teils watch' )
			if ( this.api.teil.load ) {
				return
			}

			if ( this.api.teil.current <= this.api.teil.count || null === this.api.teil.count ) {
				this.getData(this.api.teil)
			} else {
				this.api.line.teil = true
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
.svg-text {
	font-size: 150;
}
</style>