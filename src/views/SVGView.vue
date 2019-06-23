<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">SVG</span>
      </v-card-title>

      <v-container>
        <img src="@/assets/SVGExample.svg" />
      </v-container>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'SVGView'
})
</script>
