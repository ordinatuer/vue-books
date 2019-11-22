<template>
	<g>
		<circle v-bind:class="'svg-teil' + addCss"
			v-bind:id="'teil'+teil.i"
			v-bind:r="h/2"
			v-bind:cx="cxy[0]" 
			v-bind:cy="cxy[1]" 
			v-bind:fill="teil.fill || '#999'" 
			v-bind:data-model-id="teil.i"
			v-bind:data-api-id="teil.teil_id"
			v-bind:data-type="teil.type"
		>
		</circle>
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
	name: 'SvgCircle',
	props: ['teil'],
	mixins: [Draw, TeilsMixin],
	components: {
		SvgTeilText
	},
	computed: {
		cxy: function() {
			return this.coords(this.teil)
		}
	}
}
</script>

<style ></style>