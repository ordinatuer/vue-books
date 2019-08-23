<template>
	<svg :id="domId"
		xmlns="http://www.w3.org/2000/svg"
		:viewBox="'0 0 ' + viewBoxL + ' ' + viewBoxH"
		data-clunk="clunk-clunk">
		<line v-for="line in lines"
			v-bind:x1="line.lineFrom.x"
			v-bind:y1="line.lineFrom.y"
			v-bind:x2="line.lineTo.x"
			v-bind:y2="line.lineTo.y"
			stroke="black" stroke-width="20">
				
		</line>
	</svg>
</template>

<script >
export default {
	name: 'SvgLayer',
	props: [
		'viewBoxH',
		'viewBoxL',
		'domId',
		'lines'
	],
	data: function() {
		return {
			
		}
	}
}
//:viewBox="'0 0 ' + viewBoxL + ' ' + viewBoxH"
</script>

<style></style>