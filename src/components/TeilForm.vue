<template>
	<div class="teil-form-block">
		<b-button variant="outline-primary"
			class="w100"
			v-on:click="toggleForm" >
			{{newButtonText}}
		</b-button>
		<div v-if="!this.formStatus">
			<b-form id="teilForm">
				<b-form-input type="number" name="x" v-model="teil.x"></b-form-input>
				<b-form-input type="number" name="y" v-model="teil.y"></b-form-input>
				<b-form-input type="number" name="modelId" v-bind:value="teil.modelId"></b-form-input>
				<b-form-input type="number" name="teil_id" v-bind:value="teil.teil_id" disabled></b-form-input>
				<b-form-textarea name="text" v-model="teil.text"></b-form-textarea>
			</b-form>
			<b-button variant="success" class="w100"
				v-on:click="fixTeil">
				Save
			</b-button>
		</div>

		<div v-if="this.formStatus" class="new-form-block">
			<b-form v-bind:id="newForm">
				<b-form-input name="x" type="number" v-model="newTeilData.x"></b-form-input>
				<b-form-input name="y" type="number" v-model="newTeilData.y"></b-form-input>
				<b-form-radio name="type" value="1" v-model="newTeilData.type">Rectangle</b-form-radio>
				<b-form-radio name="type" value="2" v-model="newTeilData.type">Circle</b-form-radio>
				<b-form-radio name="type" value="3" v-model="newTeilData.type">Image</b-form-radio>
				<b-form-input name="image"  v-bind:value="imageName"></b-form-input>
				<b-form-file name="imagefile" v-bind:id="newFormImage" v-on:input="imageLoad"></b-form-file>
				<b-form-textarea name="text" v-model="newTeilData.text"></b-form-textarea>
			</b-form>
			<b-button variant="success" class="w100"
				v-on:click="newTeil">
				Emit
			</b-button>
		</div>
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
		methods: {
			newTeil: function() {
				let formData = new FormData(document.getElementById(this.newForm))
				let imageData = document.getElementById(this.newFormImage)

				formData.append('image', this.imageName)

				this.$emit('addTeil', this.newTeilData, formData)

				this.newTeilData = Object.assign({}, this.defaultTeil)

				
			},
			fixTeil: function() {
				let formData = new FormData(document.getElementById('teilForm'))
				let data = {}

				data.text = formData.get('text')
				data.x = formData.get('x')
				data.y = formData.get('y')

				let mid = formData.get('modelId')

				console.log( mid )
				console.log( data )

				this.$emit('fixTeil', mid, data)
			},
			toggleForm: function() {
				console.log('New!! ')
				if ( !this.formStatus) {
					this.newTeilData = Object.assign({}, this.defaultTeil)
				}
				this.formStatus = !this.formStatus


			},
			imageLoad: function(e) {
				let name = e.name || null

				this.imageName = name
				this.newTeilData.image = name
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
	.teil-form-block {
		position: absolute;
		top: 0px;
		right: 0px;
		z-index: 401;
	}
	.w100 {
		width: 100%;
	}
</style>