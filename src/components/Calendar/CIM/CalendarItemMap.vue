<template>
  <div>
    <l-map id="activity-map" :center="internalCenter" :zoom="internalZoom" style="width: 100%" @update:zoom="zoomUpdated"
      @update:center="centerUpdated" @update:bounds="boundsUpdated">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-polyline :color="polyline.color" :lat-lngs="path"></l-polyline>
    </l-map>
  </div>
</template>

<script>
import { LMap, LPolyline, LTileLayer } from '@vue-leaflet/vue-leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  props: {
    path: {
      required: true,
      type: Array
    },
    zoom: {
      required: false,
      type: Number
    },
    center: {
      required: false
    }
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      polyline: {
        color: 'green'
      },
      bounds: null,
      internalCenter: this.center,
      internalZoom: this.zoom
    }
  },
  methods: {
    zoomUpdated(newZoom) {
      this.internalZoom = newZoom
    },
    centerUpdated(newCenter) {
      this.internalCenter = newCenter
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    }
  },
  watch: {
    'this.center'(newVal) {
      this.internalCenter = newVal
    },
    'this.zoom'(newVal) {
      this.internalZoom = newVal
    }
  }
}
</script>

<style lang="scss">
// @import url("~leaflet/dist/leaflet.css");
</style>
