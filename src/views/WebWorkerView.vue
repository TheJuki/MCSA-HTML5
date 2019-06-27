<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Web Worker</span>
      </v-card-title>

      <v-container>
        <v-flex xs3>
          <v-layout
            justify-space-between
          >
           <v-text-field v-model="model.workerMessage" label="Message"></v-text-field>

            <v-btn color="blue" dark @click="sendMessage()">Send</v-btn>
          </v-layout>
        </v-flex>

        <p>Response: {{ model.workerResult }}</p>
      </v-container>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

const worker = new Worker('/ExampleWorker.js')

export default Vue.extend({
  name: 'WebWorkerView',
  data: () => ({
    model: {
      workerResult: '',
      workerMessage: ''
    }
  }),
  mounted: function () {
    const self = this

    worker.onmessage = function (e) {
      self.model.workerResult = e.data
    }
    worker.onerror = function (e) {
      alert(e.message)
    }
  },
  methods: {
    sendMessage () {
      worker.postMessage(this.model.workerMessage)
    }
  }
})
</script>
