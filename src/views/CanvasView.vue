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
      let x0 = 0
      let y0 = 0
      let r0 = 0
      let x1 = 200
      let y1 = 0
      let r1 = 100
      let width = 300
      let height = 50
      let offset = 10

      let gradient = ctx.createLinearGradient(x0, y0, x1, y1)
      addColorStops(gradient)
      ctx.fillStyle = gradient
      ctx.fillRect(10, 0 * (height + offset), width, height)
      ctx.fillRect(100, 1 * (height + offset), width, height)

      y1 = 300
      gradient = ctx.createLinearGradient(x0, y0, x1, y1)
      addColorStops(gradient)
      ctx.fillStyle = gradient
      ctx.fillRect(10, 2 * (height + offset), width, height)
      ctx.fillRect(100, 3 * (height + offset), width, height)

      x0 = x1 = width / 2
      y0 = y1 = 4 * (height + offset) + (height / 2)
      gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)
      addColorStops(gradient)
      ctx.fillStyle = gradient
      ctx.fillRect(10, 4 * (height + offset), width, height)
      ctx.fillRect(100, 5 * (height + offset), width, height)

      y0 = 5 * (height + offset) + (height / 2)
      y1 = y0 + 100
      gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)
      addColorStops(gradient)
      ctx.fillStyle = gradient
      ctx.fillRect(10, 6 * (height + offset), width, height)
      ctx.fillRect(100, 7 * (height + offset), width, height)
    }

    function addColorStops (gradient: CanvasGradient) {
      gradient.addColorStop(0, 'magenta')
      gradient.addColorStop(0.25, 'blue')
      gradient.addColorStop(0.50, 'green')
      gradient.addColorStop(0.75, 'yellow')
      gradient.addColorStop(1.0, 'red')
    }
  }
})
</script>

<style>
canvas {
  width: 100%;
  height: 200px;
}
</style>
