<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Canvas</span>
      </v-card-title>

      <v-container>
        <canvas ref="canvasRef"></canvas>
      </v-container>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'CanvasView',
  data: () => ({
    model: {
      description: 'Test'
    }
  }),
  mounted: function () {
    const canvasElement = this.$refs.canvasRef as HTMLCanvasElement
    const ctx = canvasElement.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#FF0000'
      ctx.fillRect(0, 0, 150, 75)
    }
  }
})
</script>

<style>
canvas {
  width: 100%;
  height: 500px;
}
</style>
