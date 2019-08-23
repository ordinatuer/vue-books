export default {
	data: function() {	
		let data = {
			h: 1500,
			l: 1000,
			nL: 65,
			nH: 15,
			padding: 200
		}
		let L = data.l * data.nL + (data.nL - 1) * data.padding
		let H = data.h * data.nH + (data.nH - 1) * data.padding

		data.L = L
		data.H = H

		return data
	}
}