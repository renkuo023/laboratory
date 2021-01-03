<template xmlns="http://www.w3.org/1999/html">
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
        <cover-image :src="img"/>
      </swiper-item>
    </swiper>

    <YearProgress></YearProgress>

    <div class="testtitle">试验设备任务计划</div>

    <view class="table">
      <view class="tr bg-w">
        <view class="th">产品名称</view>
        <view class="th">产品名称</view>
        <view class="th">设备有限期</view>
        <view class="th ">产品型号</view>
        <view class="th ">产品描述</view>
      </view>
      <block v-for="(item,index) in listData" :key="code">
        <view class="tr bg-g" v-if="index % 2 == 0">
          <view class="td">{{item.equipmentName}}</view>
          <view class="td">{{item.equipmentModel}}</view>
          <view class="td">{{item.validdata}}</view>
          <view class="td">{{item.productModel}}</view>
          <view class="td">{{item.description}}</view>
        </view>
        <view class="tr" v-else>
          <view class="td">{{item.equipmentName}}</view>
          <view class="td">{{item.equipmentModel}}</view>
          <view class="td">{{item.validdata}}</view>
          <view class="td">{{item.productModel}}</view>
          <view class="td">{{item.description}}</view>
        </view>
      </block>
    </view>
  </div>
</template>

<script>
import {post} from '../../util'
import YearProgress from '../../components/YearProgress'
import RTable from '../../components/RTable'
export default {
  components: {RTable, YearProgress},
  data () {
    return {
      images: [
        '//game.gtimg.cn/images/yxzj/act/a20161209story/world-power.jpg',
        '/static/images/DSP.png',
        '/static/images/EBS.png',
        '/static/images/QW10.png'
      ],
      listData: [
        {'equipmentName': '1#高低温箱', 'equipmentModel': 'ESB605F', 'validdata': '20211023', 'productModel': 'A0101-1A', 'description': 'asdfghjkl'},
        {'equipmentName': '2#高低温箱', 'equipmentModel': 'ESB605F', 'validdata': '20211023', 'productModel': 'A0101-1A', 'description': 'zxcvbnm,.'},
        {'equipmentName': '3#高温箱', 'equipmentModel': 'WG3000', 'validdata': '20211023', 'productModel': 'A0101-1A', 'description': 'bnm,'},
        {'equipmentName': '4#高低温湿热箱', 'equipmentModel': 'QW10', 'validdata': '20211023', 'productModel': 'A0101-1A', 'description': 'asdfghjkl'},
        {'equipmentName': '振动台', 'equipmentModel': 'ES50-445', 'validdata': '20211023', 'productModel': 'A0101-1A', 'description': 'yuuoo'},
        {'equipmentName': '冲击台', 'equipmentModel': 'SY100-100', 'validdata': '20211023', 'productModel': 'A0101-1A', 'description': 'czxhjiu'}
      ],
      totalItems: 0, // 总条数
      loading: true
    }
  },
  methods: {
    login () {
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
    },
    getsetting () {
      var that = this
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
              },
              fail () {
                console.log('getSetting error')
              }
            })
          }
        }
      })
    }
  },
  mounted () {
    this.login()
    this.getsetting()
  }
}
</script>

<style scoped>
swiper{
  width: 750rpx;
  height: 400rpx;
  text-align: center;
}
.testtitle {
  text-align: center;
  width: 750rpx;
  font-size: 20px;
  height: 20px;
  line-height: 40px;
  color: #009cfe;
  margin-bottom: 1rem;
}
.table {
  border: 1px solid darkgray;
}
.tr {
  display: flex;
  width: 100%;
  justify-content: center;
  min-height: 1rem;
  align-items: center;
}
.td {
  width:40%;
  justify-content: center;
  text-align: center;
}
.bg-w{
  background: snow;
}
.bg-g{
  background: #E6F3F9;
}
.th {
  width: 40%;
  justify-content: center;
  background: #3366FF;
  color: #fff;
  display: flex;
  height: 1rem;
  align-items: center;
}
</style>
