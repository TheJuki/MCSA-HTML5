<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div class="h3 headline mb-0">
          {{ $t('website.404') }}
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color='green' @click='$router.go(-1)'> {{ $t('website.go_back') }}</v-btn>
        <v-btn flat color='blue' to='/'>{{ $t('website.home') }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HTTP404View'
})
</script>
