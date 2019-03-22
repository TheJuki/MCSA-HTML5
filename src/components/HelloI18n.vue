<template>
  <h1>{{ $t('website.hello') }} {{ msg }}</h1>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HelloI18n',
  props: {
    msg: String
  }
})
</script>
