<template>
  <div class="greet">
    <image class="head" src="../../static/images/imation.gif"/>
    <scroll-view
      scroll-y
      class="box"
    >
      <div class="item" v-for="(item, index) in userList" :key="index">
        <image :src="item.user.avatarUrl"/>
        <p>{{item.user.nickName}}</p>
      </div>
    </scroll-view>
    <p class="count">已收到{{userList.length}}位好友送来的祝福</p>
    <div class="bottom">
      <button class="left" lang="zh_CN" open-type="getUserInfo" @getuserinfo="sendGreet">送上祝福</button>
    </div>
    <div class="video-dialog" @tap="toVideo">
      <image src="../../static/images/video1.png"/>
    </div>
    <div class="video" v-show="isVideo">
      <video id="myVideo" :src="videoUrl" controls poster="视频封面地址"></video>
      <div class="btn-area">
        <image src="../../static/images/close1.png" @tap="close"/>
      </div>
    </div>
  </div>
</template>

<script>
import tools from '@/common/js/h_tools'
export default {
  name: 'Greet',
  data () {
    return {
      userList: [],
      openId: "",
      userInfo: "",
      isVideo: false,
      videoUrl: null
    }
  },
  onShow () {
    const that = this;
    that.getUserList();
    that.videoContext = wx.createVideoContext('myVideo');
    // that.getVideoUrl();
  },
  methods: {
    getVideoUrl() {
      const that = this;
      const db = wx.cloud.database();
      const video = db.collection("video");
      video.get().then((res) => {
        if(res.data.length > 0) {
          that.videoUrl = res.data[0].src;
          that.videoContext.play();
        }
      });
    },

    close () {
      const that = this
      that.isVideo = false
    },

    sendGreet (e) {
      const that = this
      if (e.target.errMsg === 'getUserInfo:ok') {
        wx.getUserInfo({
          success: function (res) {
            that.userInfo = res.userInfo
            that.getOpenId()
          }
        })
      }
    },

    addUser () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.add({
        data: {
          user: that.userInfo
        }
      }).then(res => {
        that.getUserList()
      })
    },

    getOpenId () {
      const that = this
      wx.cloud.callFunction({
        name: 'user',
        data: {}
      }).then(res => {
        that.openId = res.result.openid
        that.getIsExist()
      })
    },

    getIsExist () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.where({
        _openid: that.openId
      }).get().then(res => {
        if (res.data.length === 0) {
          that.addUser()
        } else {
          tools.showToast('您已经送过祝福了~')
        }
      })
    },

    getUserList () {
      const that = this
      wx.cloud.callFunction({
        name: 'userList',
        data: {}
      }).then(res => {
        that.userList = res.result.data.reverse()
      })
    },

    toVideo () {
      const that = this
      that.isVideo = true
    }

  }
}
</script>

<style lang="stylus" scoped>
.greet
    width 100%
    height 100%
    .head
        height 150rpx
        width 200rpx
        margin 0 auto
    .box
        height 700rpx
        width 690rpx
        margin-left 30rpx
        border-radius 16rpx
        box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
        display flex
        justify-content flex-start
        align-items flex-start
        flex-wrap wrap
        .item
            width 120rpx
            display flex
            flex-direction column
            justify-content flex-start
            align-items center
            padding 25rpx
            float left
            image
                width 100rpx
                height 100rpx
                border-radius 50rpx
            p
                height 50rpx
                line-height 50rpx
                font-size 24rpx
                color #444
                width 100rpx
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                text-align center
    .bottom
        height 140rpx
        position fixed
        bottom 0
        left 0
        background rgba(255, 255, 255, 0.5)
        display flex
        justify-content center
        align-items center
        width 100%
        .left
            height 80rpx
            line-height 80rpx
            font-size 28rpx
            width 300rpx
            color #fff
            background #E62C6B
        .right
            height 80rpx
            line-height 80rpx
            font-size 28rpx
            color #fff
            width 300rpx
            background #2CA6F9
    .count
        height 60rpx
        line-height 60rpx
        background rgba(255, 255, 255, 0.5)
        position fixed
        bottom 140rpx
        left 0
        font-size 28rpx
        color #444
        text-align center
        width 100%
    .video-dialog
        position fixed
        right 10rpx
        top 50rpx
        width 70rpx
        height 70rpx
        box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
        background #fff
        border-radius 16rpx
        image
            width 100%
            height 100%
    .video
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background #fff
        z-index 99
        #myVideo
          height 90%
          width 100%
          margin-bottom 20rpx
        .btn-area
          image
            width 80rpx
            height 80rpx
            background #fff
            margin 0 auto
</style>
