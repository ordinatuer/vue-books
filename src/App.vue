<template>
  <div id="app">
    <div id="componentsWrap">
      <SvgBox />
      <div id="mapId" v-on:click="sayData"></div>
    </div>
  </div>
</template>

<script>
import SvgBox from './components/SvgBox.vue'

export default {
  name: 'app',
  components: {
    SvgBox
  },
  
  data: function() {
    return {
      bounds: [[0, 0], [1000, 600]],
      lines: [],
      teils: []
    }
  },
  mounted: function() {
    let map = L.map('mapId')
    
    this.h = 1500
    this.l = 1000
    this.nL = 35
    this.nH = 15
    this.padding = 200
    this.L = this.l * this.nL + (this.nL - 1) * this.padding
    this.H = this.h * this.nH + (this.nH - 1) * this.padding
    this.oX = this.L/2
    this.oY = this.H/2

    this.canvasID = 'svgID'

    this.svgBlock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svgBlock.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.svgBlock.setAttribute("viewBox", "0 0 " + this.L + " " + this.H);
    this.svgBlock.setAttribute("id", this.canvasID);

    map.fitBounds(this.bounds)
    map.setMaxBounds(this.bounds)
    L.svgOverlay(this.svgBlock, this.bounds).addTo(map)

    this.canvas = SVG(this.canvasID)
    this.canvas.rect(this.L, this.H).fill('white')

    this.api = {
        line: {
          url: 'http://joo25.loc/lines',
          count: null,
          current: 1,
          data: 'lines'
        }, 
        teil: {
          url: 'http://joo25.loc/teils',
          count: null,
          current: 1,
          data: 'teils'
        }
    }

    this.getData(this.api.line)
    this.getData(this.api.teil)
  },
  methods: {
    sayData: function() {
      console.log({
        t: this.teils,
        l: this.lines
      })
    },
    _getLines: function (){
      // let sb = this

      // this.$http.get(this.api.line)
      //   .then(response => {
      //     console.log([
      //       response,
      //       response.request.getResponseHeader("x-pagination-page-count"),
      //       response.request.getResponseHeader("x-pagination-current-page")
      //     ])
      //     response.data.forEach(function(l) {
      //       let line = [
      //         sb.oX + l.lineFrom.x * (sb.l + sb.padding),
      //         sb.oY + l.lineFrom.y * (sb.h + sb.padding),
      //         sb.oX + l.lineTo.x * (sb.l + sb.padding),
      //         sb.oY + l.lineTo.y * (sb.h + sb.padding)
      //       ]
      //       sb.canvas.line(line).stroke({width:20, color: 'black'})
      //     })
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    getData: function(api) {
      let sb = this,
        page = api.current

      sb.$http.get(api.url + '?page=' + api.current)
        .then(response => {
          if (null === api.count) {
            api.count = +response.request.getResponseHeader("x-pagination-page-count")
          }
          api.current += 1
          sb[api.data] = sb[api.data].concat(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    drawLines: function() {

    }
  },
  watch: {
    lines: function() {
      if ( this.api.line.current <= this.api.line.count || null === this.api.line.count ) {
        this.getData(this.api.line)
      } else {
        console.log('Lines load: ' + this.lines.length)
      }
    },
    teils: function() {
      if ( this.api.teil.current <= this.api.teil.count || null === this.api.teil.count ) {
        this.getData(this.api.teil)
      } else {
        console.log('Teils load: ' + this.teils.length)
      }
    }
  }

}
</script>

<style src="../node_modules/leaflet/dist/leaflet.css"></style>
<style>

html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app,
#mapId,
#componentsWrap
 {
  width: 100%;
  height: 100%;
  background-color: deepskyblue;
}
#mapId {
  background-color: #999;
}
</style>