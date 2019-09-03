<template>
	<div>
		<form id="teilForm" v-if="!this.formStatus">
			<div class="form-inputs">
				<input type="number" name="x" v-model="teil.x" /><br />
				<input type="number" name="y" v-model="teil.y" /><br />
				<input type="number" name="l" v-model="teil.l" /><br />
				<input type="number" name="h" v-model="teil.h" /><br />
				<!-- <input type="number" name="type" v-model="teil.type" /><br /> -->
				<input type="hidden" name="modelId" v-bind:value="teil.modelId" />
				<input type="hidden" name="teil_id" v-bind:value="teil.teil_id" />
				<textarea name="text" v-model="teil.text"></textarea><br />
			</div>
		</form>
		<div class="form-controls">
			<div id="newButton" v-on:click="toggleForm" >
				<p>{{newButtonText}}</p>
			</div>
			<div v-if="this.formStatus" v-on:click="newTeil">
				<p>Emit</p>
			</div>
		</div>
		<form id="teilFormNew" v-if="this.formStatus">
			<div class="form-inputs">
				<input type="number" name="x" v-model="newTeilData.x" /><br />
				<input type="number" name="y" v-model="newTeilData.y" /><br />
				<input type="number" name="l" v-model="newTeilData.l" /><br />
				<input type="number" name="h" v-model="newTeilData.h" /><br />
				<input type="number" name="type" v-model="newTeilData.type" /><br />
				<textarea name="text" v-model="newTeilData.text"></textarea><br />
			</div>
		</form>
	</div>
</template>
<script>
	export default {
		name: "TeilForm",
		props: ["teil"],
		data: function() {
			return {
				//newButtonText: "Add new Teil",
				formStatus: false, // true - new teil; 
				txt: {
					newButton: "Add new Teil +",
					saveButton: "Save New Teil +"
				},
				defaultTeil: {
					x: 0,
					y: 0,
					l: -1,
					h: -1,
					type: 1,
					size: 150,
					r: 60,
					fill: '#999',
					teil_id: 0,
					modelId: null,
					text: 'New Teil',
					i: 0
				},
				newTeilData: {},
				lastNewI: null
			}
		},
		mounted: function() {

		},
		methods: {
			newTeil: function() {
				this.$emit('addTeil', this.newTeilData)

				this.newTeilData = Object.assign({}, this.defaultTeil)
			},
			sayData: function(e) {
				// e.preventDefault()
				// let form = document.getElementById('teilForm')
				
			},
			toggleForm: function() {
				console.log('New!! ')
				if ( !this.formStatus) {
					this.newTeilData = Object.assign({}, this.defaultTeil)
				}
				this.formStatus = !this.formStatus


			}
		},
		computed: {
			newButtonText: function () {
				return ( this.formStatus) ? ' Fix ' : 'Add'
			}
		}
	}
</script>
<style >
	#teilForm,
	#teilFormNew {
		position: absolute;
		top: 0;
		right: 0;
		border: 2px solid white;
		z-index: 401;
		width: 170px;
	}
	#teilFormNew {
		left: 50px;
	}
	#teilForm button {
		width: 100%;
		height: 20px;
	}
	.form-controls {
		position: absolute;
		left: 0;
		bottom: 10px;
		z-index: 401;
	}
	.form-controls div {
		width: 100px;
		height: 40px;
		line-height: 10px;
		background-color: deepskyblue;
		border-right: 1px solid black;
		float: left;
		cursor: pointer;
	}
	#newButton {
		bottom: 0;
	}
</style>