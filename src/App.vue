<template>
  <div id="app">
    <CitySelect :change="change"/>
  </div>
</template>

<script>
import CitySelect from './lib/components/CitySelect.vue'

export default {
  name: 'app',
  components: {
    CitySelect
  },
  methods: {
    change: function (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
   @import './lib/assets/css/reset.scss';
</style>
