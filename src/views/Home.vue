<template>
  <div>
    <HelloI18n msg='Welcome!'/>

     <editor v-model='model.description' :api-key='this.$tinyMCEApiKey' :init='this.$options.tinyMCEInit'></editor>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import HelloI18n from '@/components/HelloI18n.vue'
import EditorConfig from '@/editor/config.json'
const Editor = require('@tinymce/tinymce-vue').default

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    tinyMCEInit?: any
  }
}

export default Vue.extend({
  tinyMCEInit: EditorConfig,
  name: 'Home',
  data: () => ({
    model: {
      description: 'Test'
    }
  }),
  components: {
    HelloI18n,
    'editor': Editor
  },
  activated () {
    document.title = `${this.$t('website.title')} | Home}`
  }
})
</script>
