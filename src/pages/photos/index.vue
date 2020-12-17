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
  },

  data () {
    return {
      list: [{
        src: '../../static/images/2.jpg'
      },
      {
        src: '../../static/images/an.jpg'
      },
      {
        src: '../../static/images/2.jpg'
      },
      {
        src: '../../static/images/an.jpg'
      },
      {
        src: '../../static/images/an.jpg'
      }],
      isGif: false
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.photo
  height 100%
</style>

