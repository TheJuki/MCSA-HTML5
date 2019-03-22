<template>
  <HelloI18n msg="Welcome!"/>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloI18n from '@/components/HelloI18n.vue'

export default Vue.extend({
  name: 'home',
  components: {
    HelloI18n
  }
})
</script>
