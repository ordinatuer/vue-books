<template>
	<line 
		v-bind:x1="cxy[0]"
		v-bind:y1="cxy[1]"
		v-bind:x2="cxy[2]"
		v-bind:y2="cxy[3]"
		stroke="black" stroke-width="20">
			
	</line>
</template>

<script >
import Draw from '../mixins/Draw.js'

export default {
	name: 'SvgLine',
	props: ['line'],
	mixins: [Draw],
	data: function() {
		return {

		}
	},
	mounted: function() {
		//console.log(this.line.lineFrom.x)
	},
	computed: {
		cxy: function() {
			let coords = this.coords(this.line.lineFrom, this.line.lineTo)

			return coords
		}
	}
}
</script>

<style ></style>