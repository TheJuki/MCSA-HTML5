<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Web Socket</span>
      </v-card-title>

      <v-container>
      </v-container>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'WebSocketView',
  data: () => ({
    model: {
      description: 'Test'
    }
  })
})
</script>
