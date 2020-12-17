<template>
  <div class="map">
    hello world
  </div>
</template>

<script>
export default {
  name: 'Map',
  data () {
    return {

    }
  },

  methods: {

    linkHe () {
      wx.makePhoneCall({
        phoneNumber: '18358274764'
      })
    },

    linkShe () {
      wx.makePhoneCall({
        phoneNumber: '17855847639'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
