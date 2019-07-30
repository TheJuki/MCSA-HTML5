<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Web Socket</span>
      </v-card-title>

      <v-container>
        <v-flex xs3>
          <v-layout
            justify-space-between
          >
           <v-text-field v-model="model.webSocketMessage" label="Message"></v-text-field>

            <v-btn color="blue" dark @click="sendMessage()">Send</v-btn>
          </v-layout>
        </v-flex>

        <h4>Response:</h4>
        <ol>
          <li v-for="result in model.webSocketResult" :key="result">
            {{ result }}
          </li>
        </ol>
      </v-container>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

let webSocket: (WebSocket | null) = null

export default Vue.extend({
  name: 'WebSocketView',
  data: () => ({
    model: {
      webSocketResult: [] as string[],
      webSocketMessage: ''
    }
  }),
  mounted: function () {
    const self = this
    webSocket = new WebSocket(this.$webSocketUrl)

    webSocket.onopen = function (evt) { onOpen(evt) }
    webSocket.onclose = function (evt) { onClose(evt) }
    webSocket.onmessage = function (evt) { onMessage(evt) }
    webSocket.onerror = function (evt) { onError(evt) }

    function onOpen (evt: Event) {
      self.model.webSocketResult.push('CONNECTED')
    }
    function onClose (evt: CloseEvent) {
      self.model.webSocketResult.push('DISCONNECTED')
    }
    function onMessage (evt: MessageEvent) {
      self.model.webSocketResult.push('RESPONSE: ' + evt.data)
    }
    function onError (evt: Event) {
      self.model.webSocketResult.push('ERROR')
    }
  },
  methods: {
    sendMessage () {
      const self = this

      if (webSocket) {
        if (webSocket.readyState !== webSocket.OPEN) {
          self.model.webSocketResult.push('NOT OPEN: ' + self.model.webSocketMessage)
          return
        }
        self.model.webSocketResult.push('SENT: ' + self.model.webSocketMessage)
        webSocket.send(this.model.webSocketMessage)
      }
    }
  }
})
</script>
<style>
ol {
  list-style-type: decimal;
}
</style>
