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
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
              v-ripple
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" :to="item.link" v-ripple>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      absolute
      class="font-weight-medium"
    >
      <v-flex
        text-right
        xs12
      >
        &copy; {{ $t('website.copyright') }} {{ new Date().getFullYear() }}
      </v-flex>
    </v-footer>
     <v-app-bar
      app
      color="blue darken-3"
      dark
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="ml-0 pl-3" style="width: 300px">
        <img class="logo" src="@/assets/MCSA.png" alt="logo">
        <span class="hidden-xs-only" style="vertical-align: middle">Exam 70-480</span>
      </v-toolbar-title>
    </v-app-bar>
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
    drawerItems: DrawerItemsConfig
  })
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
