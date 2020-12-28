<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="" class="avatar">
      <p v-text="userinfo.nickName" class="nickName"></p>
    </div>
    <YearProgress></YearProgress>
    <button class="btn" @click="scanCode">添加图书</button>
    手机型号：
    <switch @change='handlePhoneChange'></switch>
    <span>{{phone}}</span>
    地理位置：
    <switch @change='handleLocationChange'></switch>
    <span>{{location}}</span>
  </div>
</template>

<script>
  import YearProgress from '@/components/YearProgress'
  import {post, showModal} from '@/util'
  export default {
    data () {
      return {
        userinfo: {},
        openid: '',
        phone: '',
        location: ''
      }
    },
    components: {
      YearProgress
    },
    methods: {
      handlePhoneChange (e) {
        var that = this
        wx.getSystemInfo({
          success (res) {
            that.phone = res.model
          }
        })
      },
      handleLocationChange (e) {
        wx.getLocation({
          type: 'wgs84',
          success (res) {
            const latitude = res.latitude
            const longitude = res.longitude
            const speed = res.speed
            const accuracy = res.accuracy
            console.log(latitude + ':' + longitude + ':' + accuracy + ':' + speed)
          }
        })
      },
      async addBook (isbn) {
        const res = await post('/weapp/addbook', {
          isbn,
          openid: this.openid
        })
        showModal('添加成功', `${res.title}`)
      },
      scanCode () {
        var that = this
        wx.scanCode({
          success (res) {
            if (res.result) {
              console.log(res.result)
              that.addBook(res.result)
            }
          }
        })
      }
    },
    onPullDownRefresh: function (e) {
      console.log('下拉刷新')
      wx.stopPullDownRefresh()
    },
    mounted () {
      var that = this
      wx.getStorage({
        key: 'userinfo',
        success (res) {
          that.userinfo = res.data
        }
      })
      wx.getStorage({
        key: 'openid',
        success (res) {
          that.openid = res.data
        }
      })
    }
}
</script>

<style scoped>
  .avatar{
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
  }
  .nickName{
    margin: 20rpx 0;
    line-height: 40rpx;
    height: 40rpx;
    text-align: center;
  }
</style>
