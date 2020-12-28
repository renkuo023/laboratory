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
        '//game.gtimg.cn/images/yxzj/act/a20161209story/world-origin.jpg',
        '//game.gtimg.cn/images/yxzj/act/a20161209story/world-map.jpg',
        '//game.gtimg.cn/images/yxzj/act/a20161209story/world-technology.jpg',
        '//game.gtimg.cn/images/yxzj/act/a20161209story/world-power.jpg'
      ],
      openid: '',
      tableHeader: [
        {
          prop: 'datetime',
          width: 150,
          label: '日期',
          color: '#55C355'
        },
        {
          prop: 'sign_in',
          width: 152,
          label: '上班时间'
        },
        {
          prop: 'sign_out',
          width: 152,
          label: '下班时间'
        },
        {
          prop: 'work_hour',
          width: 110,
          label: '工时'
        },
        {
          prop: 'statusText',
          width: 110,
          label: '状态'
        }
      ],
      stripe: true,
      border: true,
      outBorder: true,
      row: [
        {
          'id': 1,
          'status': '正常',
          'datetime': '04-01',
          'sign_in_time': '09:30:00',
          'sign_out_time': '18:30:00',
          'work_hour': 8
        }, {
          'id': 2,
          'status': '迟到',
          'datetime': '04-02',
          'sign_in_time': '10:30:00',
          'sign_out_time': '18:30:00',
          'work_hour': 7
        }, {
          'id': 29,
          'status': '正常',
          'datetime': '04-03',
          'sign_in_time': '09:30:00',
          'sign_out_time': '18:30:00',
          'work_hour': 8
        }, {
          'id': 318,
          'status': '休息日',
          'datetime': '04-04',
          'sign_in_time': '',
          'sign_out_time': '',
          'work_hour': ''
        }, {
          'id': 319,
          'status': '正常',
          'datetime': '04-05',
          'sign_in_time': '09:30:00',
          'sign_out_time': '18:30:00',
          'work_hour': 8
        }
      ],
      msg: '暂无数据'
    }
  },
  methods: {
    onRowClick: function (e) {
      console.log('e: ', e)
    }
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
