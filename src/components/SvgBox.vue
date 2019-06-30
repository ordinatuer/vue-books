 <template>
 	<div id="teilForm">
 		<input type="text" name="x" v-bind:value="header" /><br />
 		<input type="text" name="y" /><br />
 		<input type="text" name="l" /><br />
 		<input type="text" name="h" /><br />
 	</div>
 </template>

 <script >
 	export default {
 		name: "SvgBox",
 		data: function() {
 			return {
 				header: 'TeilFormBlock'
 			}
 		}
 	}
 </script>

 <style >
	#teilForm {
		position: absolute;
		top: 0;
		right: 0;
		border: 2px solid white;
		z-index: 10;
 	}
 </style>