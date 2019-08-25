<template>
	<rect class="custRect"
		v-bind:rx="teil.r"
		v-bind:ry="teil.r"
		v-bind:x="cxy[0]" v-bind:y="cxy[1]" 
		v-bind:width="(-1===this.l)?l:h" v-bind:height="(-1===this.h)?h:l"
		v-bind:fill="teil.fill || '#999'"
		v-bind:data-model-id="teil.teil_id"
	></rect>
</template>

<script >
import Draw from '../../mixins/Draw.js'

export default {
	name: 'SvgRect',
	props: ['teil'],
	mixins: [Draw],
	mounted: function() {
		console.log( this.teil )

	},
	computed: {
		cxy: function() {
			return this.coords(this.teil)
		}
	}
}
</script>

<style ></style>