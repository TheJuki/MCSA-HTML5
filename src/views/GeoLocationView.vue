<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Geo Location</span>
      </v-card-title>

      <v-container>
        <span>{{ model.location }}</span>

        <br><br>
        <a ref="updateMapRef" target="map">Update Map</a>
        <br>
        <iframe name="map" width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ref="mapRef" style="border: 1px solid black"></iframe>
        <br>
        <small>
            <a ref="mapLinkRef" target="_blank">View Larger Map</a>
        </small>
      </v-container>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'GeoLocationView',
  data: () => ({
    model: {
      location: 'Locating...'
    }
  }),
  mounted: function () {
    const self = this

    const map = this.$refs.mapRef as HTMLIFrameElement
    const mapLink = this.$refs.mapLinkRef as HTMLAnchorElement
    const updateMapLink = this.$refs.updateMapRef as HTMLAnchorElement

    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(successGeo, errorGeo, geoOptions)
    } else {
      this.model.location = 'Geolocation is not supported by your browser'
    }

    function successGeo (position: Position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      updateMapLink.href = `https://www.openstreetmap.org/export/embed.html?marker=${latitude}%2C${longitude}`
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
      self.model.location = `Latitude: ${latitude} °, Longitude: ${longitude} °`
    }

    function errorGeo (error: PositionError) {
      self.model.location = error.message
    }
  }
})
</script>
