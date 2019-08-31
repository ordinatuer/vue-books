<template>
	<g>
		<rect class="svg-teil"
			v-bind:rx="teil.r"
			v-bind:ry="teil.r"
			v-bind:x="x" v-bind:y="y" 
			v-bind:width="width" 
			v-bind:height="height"
			v-bind:fill="teil.fill || '#999'"
			v-bind:data-model-id="teil.i"
			v-bind:data-api-id="teil.teil_id"
			v-bind:data-type="teil.type"
		>
		</rect>
		<SvgTeilText 
			v-bind:teil="teil"
			v-bind:cxy="cxy"
		/> 
	</g>
</template>

<script >
import Draw from '../../mixins/Draw.js'
import SvgTeilText from '../SvgTeilText.vue'

export default {
	name: 'SvgRect',
	props: ['teil'],
	mixins: [Draw],
	components: {
		SvgTeilText
	},
	mounted: function() {
		//console.log( window.teils[this.teil.i].text )
	},
	computed: {
		cxy: function() {
			return this.coords(this.teil)
		},
		width: function () {
			return (-1 === +this.teil.l) ? this.h : this.l
		},
		height: function() {
			return (-1 === +this.teil.h) ? this.l : this.h 
		},
		x: function() {
			return this.cxy[0] - this.width/2
		},
		y: function() {
			return this.cxy[1] - this.height/2
		}
	}
}
</script>

<style ></style>