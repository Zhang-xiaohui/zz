<template>
  <div class="index">
    <div class="bg-swiper">
      <index-swiper :list="list"></index-swiper>
    </div>
    <image class="inv" src="../../static/images/imation.gif"/>
    <div
      class="bg_music"
      v-if="isPlay"
      @tap="audioPlay"
    >
      <image
        src="../../static/images/music_icon.png"
        class="musicImg music_icon"
      />
      <image
        src="../../static/images/music_play.png"
        class="music_play pauseImg"
      />
    </div>
    <div
      class="bg_music"
      v-else
      @tap="audioPlay"
    >
      <image
        src="../../static/images/music_icon.png"
        class="musicImg"
      />
      <image
        src="../../static/images/music_play.png"
        class="music_play playImg"
      />
    </div>
    <div
      class="info"
      :animation="animationData"
    >
      <div class="content">
        <h1>Mr. & Miss.</h1>
        <p>谨定于 中午12:00</p>
        <p>农历 腊月 举办婚礼</p>
        <p>地址：</p>
        <image
          src="../../static/images/we.png"
          class="img_footer"
        />
      </div>
    </div>
    <audio
      id="myAudio"
      :src="audioUrl"
      autoplay
      loop
    ></audio>
  </div>
</template>

<script>
import IndexSwiper from "@/components/indexSwiper";
import tools from "@/common/js/h_tools";
export default {
  name: "Index",
  components: {
    IndexSwiper,
  },
  data() {
    return {
      isPlay: true,
      list: [],
      audioCtx: "",
      audioUrl: "",
    };
  },
  onShow() {
    const that = this;
    that.audioCtx = wx.createAudioContext("myAudio");
    that.isPlay = true;
    that.getMusicUrl();
  },
  methods: {
    audioPlay() {
      const that = this;
      if (that.isPlay) {
        that.audioCtx.pause();
        that.isPlay = false;
        tools.showToast("您已暂停音乐播放~");
      } else {
        that.audioCtx.play();
        that.isPlay = true;
        tools.showToast("背景音乐已开启~");
      }
    },

    getList() {
      const that = this;
      const db = wx.cloud.database();
      const banner = db.collection("banner");
      
      banner.get().then((res) => {
        if (res.data.length > 0) {
          that.list = res.data[0].srcList;
        }
      });
    },

    getMusicUrl() {
      const that = this;
      const db = wx.cloud.database();
      const music = db.collection("music");
      music.get().then((res) => {
        if(res.data.length > 0) {
          that.audioUrl = res.data[0].src;
          that.audioCtx.play();
        }
        that.getList();
      });
    }
  },

  onShareAppMessage: function (res) {
    return {
      path: "/pages/index/main",
    };
  },
};
</script>
<style scoped>
@keyframes musicRotate {
  from {
    -webkit-transformb: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}
.music_icon {
  animation: musicRotate 3s linear infinite;
}

@keyframes musicStop {
  from {
    -webkit-transform: rotate(20deg);
  }

  to {
    -webkit-transform: rotate(0deg);
  }
}
.music_play {
  animation: musicStop 1s linear forwards;
}

@keyframes musicStart {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(20deg);
  }
}
.music_play {
  animation: musicStart 1s linear forwards;
}

@keyframes infoAnimation {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
  }

  50% {
    -webkit-transform: scale(0.9) translate(5px, 5px);
  }

  100% {
    -webkit-transform: scale(1) translate(0, 0);
  }
}
.info {
  animation: infoAnimation 10s linear infinite;
}
</style>
<style scoped lang="stylus">
.index {
  height: 100%;
  position: relative;

  .img {
    width: 100%;
    height: 100%;
  }

  .bg-swiper {
    width: 100%;
    height: 100%;
  }

  .inv {
    position: absolute;
    height 150rpx
    width 200rpx
    top: 20rpx;
    left: 12rpx;
    z-index: 9;
  }

  .bg_music {
    position: fixed;
    right: 0;
    top: 20rpx;
    width: 100rpx;
    z-index: 99;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .musicImg {
      width: 60rpx;
      height: 60rpx;
    }
    .music_play {
      width: 28rpx;
      height: 60rpx;
      margin-left: -10rpx;
      transform-origin: top;
      transform: rotate(20deg);
    }
  }

  .info {
    width: 630rpx;
    background: rgba(255, 255, 255, 0.75);
    z-index: 9;
    position: fixed;
    bottom: 40rpx;
    left: 50rpx;
    padding: 10rpx;

    .content {
      width: 626rpx;
      border: 1rpx solid #000;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      padding-bottom: 30rpx;

      h1 {
        font-size: 50rpx;
        height: 100rpx;
        line-height: 100rpx;
      }

      p {
        font-size: 24rpx;
        height: 60rpx;
        line-height: 60rpx;
      }

      .img_footer {
        position: absolute;
        bottom: 0;
        left: 53rpx;
        z-index: 99;
        height: 14rpx;
        width: 520rpx;
      }
    }
  }

  #myAudio {
    display: none;
  }
}
</style>
