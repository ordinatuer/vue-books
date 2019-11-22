export default {
	computed: {
		addCss: function() {
			if (null !== this.teil.pointFront) {
				return ' ' + this.teil.pointFront
			} else {
				return ''
			}
		}
	}
}