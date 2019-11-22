<template>
	<g>
		<rect v-bind:class="'svg-teil' + addCss"
			v-bind:data-point="'point ' + teil.pointFront"
			v-bind:id="'teil'+teil.i"
			v-bind:rx="teil.r"
			v-bind:ry="teil.r"
			v-bind:x="x"
			v-bind:y="y" 
			v-bind:width="h"
			v-bind:height="l"
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
import TeilsMixin from '../../mixins/TeilsMixin.js'
import SvgTeilText from '../SvgTeilText.vue'


export default {
	name: 'SvgRect',
	props: ['teil'],
	mixins: [Draw, TeilsMixin],
	components: {
		SvgTeilText
	},
	computed: {
		cxy: function() {
			return this.coords(this.teil)
		},
		x: function() {
			return this.cxy[0] - this.h/2
		},
		y: function() {
			return this.cxy[1] - this.l/2
		}
	}
}
</script>

<style ></style>