<template>
	<SvgRect v-if="1 === teil.type" v-bind:teil="teil" />
	<SvgCircle v-else-if="2 === teil.type" v-bind:teil="teil" />
	<SvgImage v-else-if="3 === teil.type" v-bind:teil="teil" />
</template>

<script>
import SvgRect from './teils/SvgRect.vue'
import SvgCircle from './teils/SvgCircle.vue'
import SvgImage from './teils/SvgImage.vue'

export default {
	name: 'SvgTeil',
	props: ['teil'],
	components: {
		SvgRect,
		SvgCircle,
		SvgImage
	}
}
</script>

<style>
.svg-teil:hover {
	stroke: black;
	stroke-width: 20px;
}
.point-start {
	stroke: blue;
    stroke-width: 50px;
}
.point-stop {
	stroke: red;
    stroke-width: 50px;
}
</style>