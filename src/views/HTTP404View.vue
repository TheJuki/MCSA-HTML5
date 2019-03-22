<template>
  <v-container fluid>
    <v-card style="width: 100%">
      <v-card-title primary-title>
        <div class="h3 headline mb-0">
          {{ $t('website.404') }}
        </div>
        <v-card-actions>
          <v-btn flat color='green' @click='$router.go(-1)'> {{ $t('website.go_back') }}</v-btn>
          <v-btn flat color='blue' to='/'>{{ $t('website.home') }}</v-btn>
        </v-card-actions>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HTTP404View',
  activated () {
    document.title = `${this.$t('website.title')} | 404`
  }
})
</script>
