<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Audio</span>
      </v-card-title>

      <v-container>
        <audio
          ref="audioRef"
          :controls="model.controls"
          :loop="model.loop"
          :autoplay="model.autoplay"
          :preload="model.preload"
          :muted="model.muted"
          v-if="loaded"
        >
          <source src="@/assets/media/Sneaky_Snitch.mp3" type="audio/mpeg">Your browser does not support the
          <code>audio</code> element.
        </audio>

        <v-switch v-model="model.controls" color="blue" label="Controls"></v-switch>
        <v-switch v-model="model.loop" color="blue" label="Loop"></v-switch>
        <v-switch v-model="model.autoplay" color="blue" label="Autoplay"></v-switch>
        <v-switch v-model="model.muted" color="blue" label="Muted"></v-switch>
        <v-switch v-model="model.preload" color="blue" label="Preload" value="auto"></v-switch>

        <v-btn outline color="blue" @click="playPause()">Play/Pause</v-btn>

        <v-card class="credits">
          <v-container>
            Music from https://filmmusic.io:
            <br>
            "Sneaky Snitch" by Kevin MacLeod (https://incompetech.com)
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
  name: 'AudioView',
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
    const localStorageItem = localStorage.getItem('audioModel')

    if (localStorageItem) {
      this.model = JSON.parse(localStorageItem || '{}')
    }

    this.loaded = true
  },
  watch: {
    model: {
      handler (val) {
        localStorage.setItem('audioModel', JSON.stringify(this.model))
      },
      deep: true
    }
  },
  methods: {
    playPause () {
      const audioElement = this.$refs.audioRef as HTMLMediaElement

      if (audioElement.paused) {
        audioElement.play()
      } else {
        audioElement.pause()
      }
    }
  }
})
</script>

<style>
audio {
  min-width: 50%;
  margin-bottom: 50px;
}
</style>
