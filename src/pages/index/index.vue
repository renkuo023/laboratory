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
<!--    <r-table-->
<!--      :headers="headers"-->
<!--      :items="items"-->
<!--      :pagination="pagination"-->
<!--      :total-items="totalItems"-->
<!--      :loading="loading"-->
<!--    >-->
<!--    </r-table>-->
    <view class="table">
      <view class="tr bg-w">
        <view class="th">head1</view>
        <view class="th">head2</view>
        <view class="th ">head3</view>
      </view>
      <block v-for="(item,index) in listData" :key="code">
        <view class="tr bg-g" v-if="index % 2 == 0">
          <view class="td">{{item.code}}</view>
          <view class="td">{{item.text}}</view>
          <view class="td">{{item.type}}</view>
        </view>
        <view class="tr" v-else>
          <view class="td">{{item.code}}</view>
          <view class="td">{{item.text}}</view>
          <view class="td">{{item.type}}</view>
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
        {'code': '01', 'text': 'text1', 'type': 'type1'},
        {'code': '02', 'text': 'text2', 'type': 'type2'},
        {'code': '03', 'text': 'text3', 'type': 'type3'},
        {'code': '04', 'text': 'text4', 'type': 'type4'},
        {'code': '05', 'text': 'text5', 'type': 'type5'},
        {'code': '06', 'text': 'text6', 'type': 'type6'},
        {'code': '07', 'text': 'text7', 'type': 'type7'}
      ],
      headers: [
        {
          text: 'Dessert',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat', value: 'fat' },
        { text: 'Carbs', value: 'carbs' },
        { text: 'Protein', value: 'protein' },
        { text: 'Iron', value: 'iron' }
      ],
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ],
      pagination: {
        rowsPerPage: 10
      }, // 分页信息
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
