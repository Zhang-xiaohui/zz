<template>
  <div class="photo">
    <h-swiper :list="list" :isGif="isGif"></h-swiper>
  </div>
</template>

<script>
import HSwiper from '@/components/swiper'
export default {
  name: 'Photo',
  components: {
    HSwiper
  },
  onShow () {
    const that = this
    that.isGif = !that.isGif
    that.getList()
  },

  data () {
    return {
      list: [{
        src: require('../../static/photos/2.jpg')
      },
      {
        src: require('../../static/photos/an.jpg')
      },
      {
        src: require('../../static/photos/2.jpg')
      },
      {
        src: require('../../static/photos/an.jpg')
      },
      {
        src: require('../../static/photos/2.jpg')
      },{
        src: require('../../static/photos/an.jpg')
      },
      {
        src: require('../../static/photos/2.jpg')
      }],
      isGif: false
    }
  },
  methods: {
    // getList () {
    //   const that = this
    //   const db = wx.cloud.database()
    //   const banner = db.collection('indexBanner')
    //   banner.get().then(res => {
    //     that.list = res.data[0].indexBanner
    //   })
    // }
  }
}
</script>

<style lang="stylus" scoped>
.photo
  height 100%
</style>

