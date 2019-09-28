<template>
	<div>
		<form id="teilForm" v-if="!this.formStatus">
			<div class="form-inputs">
				<input type="number" name="x" v-model="teil.x" /><br />
				<input type="number" name="y" v-model="teil.y" /><br />
				<input type="hidden" name="modelId" v-bind:value="teil.modelId" />
				<input type="number" name="teil_id" v-bind:value="teil.teil_id" disabled="true" />
				<textarea name="text" v-model="teil.text"></textarea><br />
			</div>
		</form>
		<div class="form-controls">
			<div id="newButton" v-on:click="toggleForm" >
				<p>{{newButtonText}}</p>
			</div>
			<div v-if="!this.formStatus" v-on:click="fixTeil">
				<p>Save</p>
			</div>
			<div v-if="this.formStatus" v-on:click="newTeil">
				<p>Emit</p>
			</div>
		</div>
		<form v-bind:id="newForm" v-if="this.formStatus">
			<div class="form-inputs">
				<input type="number" name="x" v-model="newTeilData.x" /><br />
				<input type="number" name="y" v-model="newTeilData.y" /><br />
				<input type="radio" name="type" value="1" v-model="newTeilData.type" /><label>Rectangle</label><br/>
				<input type="radio" name="type" value="2" v-model="newTeilData.type" /><label>Circle</label><br/>
				<input type="radio" name="type" value="3" v-model="newTeilData.type" /><label>Image</label><br/>
				<input type="text" name="image" v-bind:value="imageName" disabled /><br />
				<input v-bind:id="newFormImage" type="file" name="imagefile" v-on:input="imageLoad" />
				<textarea name="text" v-model="newTeilData.text"></textarea><br />
			</div>
		</form>
	</div>
</template>
<script>
	export default {
		name: 'TeilForm',
		props: ['teil'],
		data: function() {
			return {
				formStatus: false, // true - new teil; 
				newForm: 'teilFormNew',
				newFormImage: 'imageFile',
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
					image: null,
					i: 0
				},
				newTeilData: {},
				lastNewI: null,
				imageName: null
			}
		},
		mounted: function() {

		},
		methods: {
			newTeil: function() {
				let formData = new FormData(document.getElementById(this.newForm))
				let imageData = document.getElementById(this.newFormImage)

				formData.append('image', this.imageName)
				//console.log(formData)
				//window.D = formData

				this.$emit('addTeil', this.newTeilData, formData)

				this.newTeilData = Object.assign({}, this.defaultTeil)

				
			},
			fixTeil: function() {
				let formData = new FormData(document.getElementById('teilForm'))
				let data = {}

				data.text = formData.get('text')
				data.x = formData.get('x')
				data.y = formData.get('y')

				let id = formData.get('modelId')

				this.$emit('fixTeil', id, data)
			},
			toggleForm: function() {
				console.log('New!! ')
				if ( !this.formStatus) {
					this.newTeilData = Object.assign({}, this.defaultTeil)
				}
				this.formStatus = !this.formStatus


			},
			imageLoad: function(e) {
				let name = e.target.value.split('\\').pop() || null

				this.imageName = name
				this.newTeilData.image = name

				//console.log( name )
			}
		},
		watch: {
			teil: function() {
				console.log(this.teil.i + ' | ' + this.teil.teil_id)
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