<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">AJAX</span>
      </v-card-title>

      <v-container>
        <h2>Weather</h2>

        <v-flex xs3>
          <v-layout
            justify-space-between
          >
            <v-text-field v-model="model.city" label="City"></v-text-field>

            <v-btn color="blue" dark @click="searchWeather()">Search</v-btn>
          </v-layout>
        </v-flex>

        <div><strong>Current Temp: </strong>{{ currentTemp }}</div>
        <div><strong>High: </strong>{{ high }}</div>
        <div><strong>Low: </strong>{{ low }}</div>
      </v-container>
    </v-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Weather from '@/models/Weather.ts'

export default Vue.extend({
  name: 'AJAXView',
  data: () => ({
    model: {
      weather: {} as Weather,
      city: 'Mobile'
    }
  }),

  computed: {
    currentTemp (): number {
      if (this.model.weather && this.model.weather.main) {
        return Math.round(this.model.weather.main.temp)
      } else {
        return 0
      }
    },
    high (): number {
      if (this.model.weather && this.model.weather.main) {
        return Math.round(this.model.weather.main.temp_max)
      } else {
        return 0
      }
    },
    low (): number {
      if (this.model.weather && this.model.weather.main) {
        return Math.round(this.model.weather.main.temp_min)
      } else {
        return 0
      }
    }
  },
  methods: {
    searchWeather () {
      const self = this
      const xmlRequest = new XMLHttpRequest()

      xmlRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            self.model.weather = JSON.parse(this.responseText)
          } else {
            console.error(this.statusText)
            alert(this.statusText)
          }
        }
      }

      xmlRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${this.model.city}&units=imperial&APPID=${this.$openWeatherApiKey}`, true)
      xmlRequest.send()
    }
  }
})
</script>
