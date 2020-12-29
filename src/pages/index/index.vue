<template>
  <div>
    <swiper
      :indicator-dots='true'
      indicator-color='#EA5A49'
      :autoplay='true'
      :interval='3000'
      :duration='1000'
      :circular='true'
    >
      <swiper-item v-for='(img,index) in images' :key='index'>
        <img :src="img">
      </swiper-item>
    </swiper>
    <YearProgress></YearProgress>
  </div>
</template>

<script>
import {post} from '../../util'
import YearProgress from '../../components/YearProgress'
export default {
  components: {YearProgress},
  data () {
    return {
      images: [
        '//game.gtimg.cn/images/yxzj/act/a20161209story/world-power.jpg',
        '//game.gtimg.cn/images/yxzj/act/a20161209story/world-technology.jpg',
        '//game.gtimg.cn/images/yxzj/act/a20161209story/world-origin.jpg'
      ]
    }
  },
  methods: {
  },
  mounted () {
    var that = this
    wx.login({
      success (res) {
        if (res.code) {
          that.openid = res.code
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '没有授权',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.getUserInfo({
            success: function (res) {
              // 发起网络请求
              res.userInfo.openid = that.openid
              post('/weapp/login', res)
              console.log('res.userInfo')
              console.log(res.userInfo)
              var info = res.userInfo
              that.userInfo.nickName = info.nickName
              // console.log('------')
              that.userInfo.avatarUrl = info.avatarUrl
              wx.setStorage({
                key: 'userinfo',
                data: info
              })
            }
          })
        }
      },
      fail () {
        console.log('getSetting error')
      }
    })
  }
}
</script>

<style scoped>
swiper{
  width: 750rpx;
  height: 400rpx;
}
img{
  width: 750rpx;
  height: 400rpx;
}
</style>
