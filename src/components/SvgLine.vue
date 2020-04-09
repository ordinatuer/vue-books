<template>
	<line
		v-bind:id="'line'+line.line_id"
		v-bind:x1="cxy[0]"
		v-bind:y1="cxy[1]"
		v-bind:x2="cxy[2]"
		v-bind:y2="cxy[3]"
		v-bind:stroke="lineStroke" stroke-width="100">
			
	</line>
</template>

<script >
import Draw from '../mixins/Draw.js'

export default {
	name: 'SvgLine',
	props: ['line'],
	mixins: [Draw],
	data: function(){
		let colors = [];

		colors[0] = 'black'
		colors[1] = 'green'
		colors[-1] = 'red'
		colors[2] = 'blue'

		return {
			colors: colors
		};
	},
	computed: {
		cxy: function() {
			let coords = this.coords(this.line.lineFrom, this.line.lineTo)

			return coords
		},
		lineStroke: function() {
			let flag = +this.line.answer

			return this.colors[flag]
		}
	}
}
</script>

<style ></style>