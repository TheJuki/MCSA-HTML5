<!-- Main App View -->
<!-- Contains navigation drawer and header wrapper around content -->
<template>
  <v-app>
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer">
      <v-list dense>
        <template v-for="item in this.drawerItems">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
              v-ripple
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.link" v-ripple>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      fixed
      style="padding-left:10px"
      v-show="drawer"
    >&copy; {{ $t('website.copyright') }} {{ new Date().getFullYear() }}</v-footer>
    <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.lgAndUp" fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="ml-0 pl-3" style="width: 300px">
        <img class="logo" src="@/assets/MCSA.png" alt="logo">
        <span class="hidden-xs-only" style="vertical-align: middle">Exam 70-480</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

import DrawerItemsConfig from '@/drawerItems.json'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    drawerItems?: any
  }
}

export default Vue.extend({
  name: 'container',
  data: () => ({
    drawer: null,
    drawerItems: DrawerItemsConfig,
    search: ''
  }),
  methods: {
    performSearch () {

    },
    changePassword () {

    }
  }
})
</script>

<style lang="stylus">
.logo {
  width: 30px
  margin-right: 10px
  margin-left: 10px
  display: inline-block
  vertical-align: middle
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.view {
  margin: 20px
}

.credits {
  margin: 50px 0px 50px 0px
}
</style>
