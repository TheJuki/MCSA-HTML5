<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Drag &amp; Drop</span>
      </v-card-title>

      <v-container fluid>
        <p>Drag the image back and forth between the two div elements.</p>
        <v-flex xs3>
          <v-layout
            justify-space-between
          >
            <div ref="drop1" id="drop1" class="dropTarget">
              <img ref="drag1" id="drag1" draggable="true" src="@/assets/MCSA.png" width="88">
            </div>

            <div ref="drop2" id="drop2" class="dropTarget"></div>
          </v-layout>
        </v-flex>
      </v-container>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'DragDropView',

  mounted: function () {
    const drop1 = this.$refs.drop1 as HTMLDivElement
    const drop2 = this.$refs.drop2 as HTMLDivElement
    const drag1 = this.$refs.drag1 as HTMLImageElement

    drop1.addEventListener('dragover', function (event) {
      allowDrop(event as DragEvent)
    })
    drop2.addEventListener('dragover', function (event) {
      allowDrop(event as DragEvent)
    })
    drop1.addEventListener('dragenter', function (event) {
      handleDragEnter(event as DragEvent)
    })
    drop2.addEventListener('dragenter', function (event) {
      handleDragEnter(event as DragEvent)
    })
    drop1.addEventListener('drop', function (event) {
      handleDrop(event as DragEvent)
    })
    drop2.addEventListener('drop', function (event) {
      handleDrop(event as DragEvent)
    })
    drag1.addEventListener('dragstart', function (event) {
      handleDrag(event as DragEvent)
    })

    function allowDrop (ev: DragEvent) {
      ev.preventDefault()
    }

    function handleDragEnter (ev: DragEvent) {
      ev.preventDefault()

      if (ev.dataTransfer) {
        ev.dataTransfer.dropEffect = 'copy'
      }
    }

    function handleDrag (ev: DragEvent) {
      if (ev.dataTransfer && ev.target) {
        ev.dataTransfer.effectAllowed = 'copyMove'

        const target = ev.target as HTMLDivElement
        ev.dataTransfer.setData('text', target.id)
      }
    }

    function handleDrop (ev: DragEvent) {
      ev.preventDefault()

      if (ev.dataTransfer && ev.target) {
        const target = ev.target as HTMLDivElement
        const data = ev.dataTransfer.getData('text')
        const imageDiv = document.getElementById(data)

        if (imageDiv) {
          target.appendChild(imageDiv)
        }
      }
    }
  }
})
</script>

<style>
.dropTarget {
  float: left;
  width: 110px;
  height: 110px;
  border: 1px solid black;
  padding: 10px;
}
</style>
