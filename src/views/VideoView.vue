<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Video</span>
      </v-card-title>

      <v-container>
        <video
          ref="videoRef"
          :controls="model.controls"
          :loop="model.loop"
          :autoplay="model.autoplay"
          :preload="model.preload"
          :muted="model.muted"
          v-if="loaded"
        >
          <source src="@/assets/media/Buck_Bunny.mp4" type="video/mp4">Your browser does not support the
          <code>video</code> element.
        </video>

        <v-switch v-model="model.controls" color="blue" label="Controls"></v-switch>
        <v-switch v-model="model.loop" color="blue" label="Loop"></v-switch>
        <v-switch v-model="model.autoplay" color="blue" label="Autoplay"></v-switch>
        <v-switch v-model="model.muted" color="blue" label="Muted" value="true"></v-switch>
        <v-switch v-model="model.preload" color="blue" label="Preload" value="auto"></v-switch>

        <v-btn outline color="blue" @click="playPause()">Play/Pause</v-btn>

        <v-card class="credits">
          <v-container>
            Video from https://peach.blender.org:
            <br>
            "Bug Buck Bunny" by Blender Foundation (www.bigbuckbunny.org)
            <br>
            Licence: CC BY (http://creativecommons.org/licenses/by/4.0/)
          </v-container>
        </v-card>
      </v-container>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'VideoView',
  data: () => ({
    loaded: false,
    model: {
      controls: true,
      loop: true,
      autoplay: false,
      muted: false,
      preload: 'metadata'
    }
  }),
  mounted: function () {
    const localStorageItem = localStorage.getItem('videoModel')

    if (localStorageItem) {
      this.model = JSON.parse(localStorageItem || '{}')
    }

    this.loaded = true
  },
  watch: {
    model: {
      handler (val) {
        localStorage.setItem('videoModel', JSON.stringify(this.model))
      },
      deep: true
    }
  },
  methods: {
    playPause () {
      const videoElement = this.$refs.videoRef as HTMLMediaElement

      if (videoElement.paused) {
        videoElement.play()
      } else {
        videoElement.pause()
      }
    }
  }
})
</script>

<style>
video {
  width:600px;
  max-width:100%;
  margin-bottom: 50px;
}
</style>
