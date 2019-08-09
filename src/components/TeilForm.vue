<template>
	<div id="teilForm">
		<div class="form-inputs">
			<input type="text" name="x" v-model="teil.x" /><br />
			<input type="text" name="y" v-model="teil.y" /><br />
			<input type="text" name="l" v-model="teil.l" /><br />
			<input type="text" name="h" v-model="teil.h" /><br />
			<input type="text" name="domId" v-model="teil.domId" /><br />

			<input type="text" name="teil_id" v-model="teil.teil_id" /><br />
			<textarea name="text" v-model="teil.text"></textarea><br />
		</div>

		<div class="form-controls">
			<button v-on:click="$emit('subsay', teil.modelId)">Emit</button><br />
			<button v-on:click="sayData">PrinT</button>
			<button v-on:click="newTeil">{{newButtonText}}</button>
		</div>
 	</div>
</template>
<script>
	export default {
		name: "TeilForm",
		props: ["teil"],
		data: function() {
			return {
				newButtonText: "Add new Teil",
				txt: {
					newButton: "Add new Teil +",
					saveButton: "Save New Teil +"
				}
			}
		},
		methods: {
			sayData: function() {
				//console.log(this.teil.x + ' | ' + this.teil.text + ' | ' + this.teil.domId )
				//console.log(this.teil)

				let el = document.getElementById(this.teil.domId)
				let x = +el.getAttribute("x") + 5000

				el.setAttribute("x", x)
				console.log()
			},
			newTeil: function() {
				console.log('New!!')
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
		z-index: 401;
	}
	#teilForm button {
		width: 100%;
		height: 20px;
	}
 </style>