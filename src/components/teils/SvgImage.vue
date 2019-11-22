<template>
	<image 
		v-bind:class="'svg-teil' + addCss"
		v-bind:href="imgSrc + teil.image" 
		v-bind:width="l" 
		v-bind:height="h" 
		v-bind:x="cxy[0] - l/2" 
		v-bind:y="cxy[1] - h/2" 
		v-bind:data-model-id="teil.i"
		v-bind:data-api-id="teil.teil_id"
		v-bind:data-type="teil.type"
	>
	</image>
</template>

<script >
import Draw from '../../mixins/Draw.js'
import TeilsMixin from '../../mixins/TeilsMixin.js'

export default {
	name: 'SvgImage',
	props: ['teil'],
	mixins: [Draw, TeilsMixin],
	computed: {
		cxy: function() {
			return this.coords(this.teil)
		}
	}
}
</script>

<style ></style>