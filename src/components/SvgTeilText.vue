<template>
	<text class="svg-text"
		text-anchor="middle"
		v-bind:x="cxy[0]"
		v-bind:y="cxy[1]+teil.size-(textStrings.length/2)*this.lineHeight"
		v-bind:font-size="teil.size">
		<tspan v-for="(str, i) in textStrings" 
			v-bind:x="cxy[0]"
			v-bind:dy="(0 === i) ? 0 : lineHeight">
			{{str}}
		</tspan>
	</text>
</template>

<script>
export default {
	name: 'SvgTeilText',
	props: ['teil', 'cxy'],
	computed: {
		textStrings: function() {
			let strings = this.teil.text.split('\n')
			return strings
		},
		lineHeight: function() {
			return this.teil.size
		}
	}
}
</script>
<style >

</style>