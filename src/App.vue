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
				v-on:click.exact="canvasClick"
				v-on:click.ctrl="canvasCtrlClick"
			>
				<rect v-bind:width="L" v-bind:height="H" fill="white" x="0" y="0"></rect>
				<SvgLine v-for="line in lines" v-bind:line="line"
					v-if="0 < lines.length" />
				<SvgTeil v-for="(teil, i) in teils" 
					v-bind:teil="numTeil(teil, i)"
					v-if="0 < teils.length" />
			</svg>
		</div>
	</div>
</template>

<script>
import TeilForm from './components/TeilForm.vue'
import SvgLine from './components/SvgLine.vue'
import SvgTeil from './components/SvgTeil.vue'
const qs = require('querystring')
const apiServer = 'http://books.loc'

import Draw from './mixins/Draw.js'

export default {
	name: 'app',
	components: {
		TeilForm,
		SvgLine,
		SvgTeil
	},
	mixins:[
		Draw
	],
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
			teilInForm: {},
			linePoints: [],
			linePointsFront: []
		}
	},
	mounted: function() {
		this.bounds = [[0, 0], [this.L, this.H]]
		
		this.map = L.map('mapId')

		this.map.fitBounds(this.bounds)
		this.map.setMaxBounds(this.bounds)
		this.map.setMinZoom(4)
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
				//this.teils.push(newData)

				let data = formData
				let _this = this

				this.$http({
					method: 'post',
					url: this.api.teil.url,
					data: data,
					headers: {
						'Content-type': 'multipart/form-data'
					}
				})
				.then(response => {
					_this.teils.push(response.data)
				})
				.catch(error => {
					
				})
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
					
				})
				.catch(error => {
					
				})
			}
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
				
			})
		},
		canvasClick: function(e) {
			//let _this = this
			let el = e.target

			// api data id (teil_id)
			let id = el.getAttribute('data-api-id')

			// number in App.data.[lines/teils] 
			let modelId = el.getAttribute('data-model-id')

			if ( modelId ) {
				this.teilInForm = this.teils[modelId]
				this.teilInForm.modelId = modelId
			}
		},
		canvasCtrlClick: function(e) {
			let apiId = e.target.getAttribute('data-api-id') || null

			if ( null !== apiId ) { // click on teil-element
				let modelId = e.target.getAttribute('data-model-id')

				switch ( this.linePoints.length ) {
					case 0:
						this.linePoints.push(apiId)
						this.linePointsFront.push(modelId)
						break
					case 1:
						if ( this.linePoints[0] === apiId) {
							break
						} else {
							this.linePoints.push(apiId)
							this.linePointsFront.push(modelId)
						}
						break
				}
			} else {
				if (2 === this.linePoints.length) {
					this.addLine()
				}
			}
		},
		addLine: function() {
			let data = {
				'line_from': this.linePoints[0],
				'line_to': this.linePoints[1]
			}

			this.$http({
				method: 'POST',
				url: this.api.line.url,
				data: data,
				headers: {
					'Content-type': 'application/json; charset=utf-8'
				}
			}).then(response => {
				if (201 === response.status) {
					this.lines.push(response.data)
				}
				this.linePointsClear()
			}).catch(error => {
				
			})
		},
		linePointsClear: function() {
			this.linePoints = []

			let points = this.linePointsFront
			if (points[0]) {
				this.$set(this.teils[points[0]], 'pointFront', null)
			}

			if (points[1]) {
				this.$set(this.teils[points[1]], 'pointFront', null)
			}

			this.linePointsFront = []
		}
	},
	watch: {
		linePointsFront: function(points) {
			if (points[0]) {
				this.$set(this.teils[points[0]], 'pointFront', 'point-start')
			}

			if (points[1]) {
				this.$set(this.teils[points[1]], 'pointFront', 'point-stop')
			}
		},
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