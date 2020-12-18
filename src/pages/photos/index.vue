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
      list: [],
      isGif: false
    }
  },
  methods: {
    getList () {
      const that = this
      const db = wx.cloud.database()
      const photos = db.collection('photos')
      photos.get().then(res => {
        if (res.data.length > 0) {
          that.list = res.data[0].srcList
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.photo
  height 100%
</style>

