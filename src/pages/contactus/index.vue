<template>
  <div>
    <i-steps direction="vertical" class="step">
      <i-step icon="coordinates_fill" >
        <view slot="title">
          地址
        </view>
        <view slot="content">
          北京市昌平区阳坊镇阳坊工业园南区航天电子
        </view>
      </i-step>
      <i-step icon="mobilephone">
        <view slot="title">
          电话
        </view>
        <view slot="content">
          010-69766012-8117
          010-69766012-8032
        </view>
      </i-step>
      <i-step icon="mine_fill">
        <view slot="title">
          邮编
        </view>
        <view slot="content">
          102200
        </view>
      </i-step>
      <i-step icon="mobilephone_fill">
        <view slot="title">
          传真
        </view>
        <view slot="content">
          010-69766012-8000
        </view>
      </i-step>
    </i-steps>

    <map
      :latitude="latitude"
      :longitude="longitude"
      style="width: 100%; height: 400px;"
      @tap="handleclick"
      @markertap="markertap"
      @callouttap="callouttap"
      @labeltap="labeltap"
      :markers="markers"
      scale="18"
      show-location="true"
    >
      <cover-view slot="callout">
        <cover-view marker-id="1"></cover-view>
        <cover-view marker-id="2"></cover-view>
      </cover-view>
    </map>
  </div>
</template>

<script>
export default {
  data () {
    return {
      latitude: 40.11889,
      longitude: 116.12208,
      markers: [{
        id: 4,
        latitude: 40.11889,
        longitude: 116.12209,
        iconPath: '/static/tabs/location.png',
        callout: {
          content: '北京市昌平区阳坊镇阳坊工业园南区航天电子',
          color: '#11ff00',
          fontSize: 14,
          borderWidth: 2,
          borderRadius: 10,
          borderColor: '#000000',
          bgColor: '#fff',
          padding: 5,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      }]
    }
  },
  mounted () {
    this.mapCtx = wx.createMapContext('myMap')
  },
  methods: {
    markertap (e) {
      console.log('@@@ markertap', e)
    },
    callouttap (e) {
      console.log('@@@ callouttap', e)
    },
    labeltap (e) {
      console.log('@@@ labeltap', e)
    },
    handleclick (e) {
      console.log('@click', e)
    }
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
.page-section-gap{
  box-sizing: border-box;
  padding: 0 30rpx;
}

.page-body-button {
  margin-bottom: 30rpx;
}

.customCallout {
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 30px;
  width: 150px;
  height: 40px;
  display: inline-flex;
  padding: 5px 20px;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.icon {
  width: 16px;
  height: 16px;
}

.content {
  flex: 0 1 auto;
  margin: 0 10px;
  font-size: 14px;
}
.step{
  margin: 20px;
}
</style>
