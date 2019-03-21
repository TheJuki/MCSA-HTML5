<template>
  <v-card style="margin: 20px">
    <v-card-title>
      Browser Compatibility
    </v-card-title>
    <v-data-table
      :hide-actions='true'
      :headers='headers'
      :items='tableData'
    >
      <template slot='items' slot-scope='props'>
        <td>{{ props.item.browser }}</td>
        <td>{{ props.item.version }}</td>
        <td>
          <a :href='props.item.link' rel='noopener noreferrer' target='_blank'>{{ props.item.link }}</a>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'HTML5 Browser Compatibility',
  data: () => ({
    headers: [
      { text: 'Browser', value: 'browser', sortable: false },
      { text: 'Version', value: 'version', sortable: false },
      { text: 'Link', value: 'link', sortable: false
       }
    ],
    tableData: [
      {
        browser: 'Android',
        version: '2.1+',
        link: 'https://www.android.com/'
      },
      {
        browser: 'Chrome',
        version: '14+',
        link: 'https://www.google.com/chrome/'
      },
      {
        browser: 'Firefox',
        version: '7+',
        link: 'https://www.mozilla.org/en-US/firefox/new/'
      },
      {
        browser: 'Internet Explorer',
        version: '9+',
        link: 'https://www.microsoft.com/en-us/download/internet-explorer.aspx'
      },
      {
        browser: 'Mobile Safari',
        version: '3.1+',
        link: 'https://www.apple.com/ios/'
      },
      {
        browser: 'Opera',
        version: '11+',
        link: 'https://www.opera.com/'
      },
      {
        browser: 'Opera Mobile',
        version: '5+',
        link: 'https://www.opera.com/mobile/android'
      },
       {
        browser: 'Safari',
        version: '5+',
        link: 'https://www.apple.com/safari/'
      }
    ]
  })
})
</script>
