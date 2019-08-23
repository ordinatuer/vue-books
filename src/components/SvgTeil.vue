<template>
	<SvgRect v-if="1 === teil.type" />
	<SvgCircle v-else-if="2 === teil.type" />
	<SvgImage v-else-if="3 === teil.type" />
</template>

<script>
import SvgRect from './teils/SvgRect.vue'
import SvgCircle from './teils/SvgCircle.vue'
import SvgImage from './teils/SvgImage.vue'

console.log('SvgTeil mounted Outer')
export default {
	name: 'SvgTeil',
	props: ['teil'],
	components: {
		SvgRect,
		SvgCircle,
		SvgImage
	},
	data: function() {
		return {

		}
	},
	mounted: function() {
		//console.log('SvgTeil mounted ' + this.teil.type)
	}
}
</script>

<style></style>