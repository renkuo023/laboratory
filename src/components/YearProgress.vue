<template>
  <div class="progressbar">
    <progress :percent='percent' activeColor='#EA5A49'></progress>
    <p>{{year}}已经过去{{days}}天{{percent}}%</p>

  </div>
</template>

<script>
  export default {
    name: 'YearProgress',
    data () {
      return {
      }
    },
    computed: {
      year () {
        return new Date().getFullYear()
      },
      days () {
        let start = new Date()
        start.setMonth(0)
        start.setDate(1)
        let offset = new Date().getTime() - start.getTime()
        return parseInt(offset / 1000 / 60 / 60 / 24) + 1
      },
      percent () {
        return (this.days * 100 / this.getDayOfYear()).toFixed(2)
      }
    },
    mounted () {

    },
    methods: {
      isLeapYear () {
        const year = new Date().getFullYear()
        if (year % 400 === 0) {
          return true
        } else if (year % 4 === 0 && year % 100 !== 0) {
          return true
        } else {
          return false
        }
      },
      getDayOfYear () {
        return this.isLeapYear() ? 366 : 365
      }
    }
  }
</script>

<style scoped>
  .progressbar{
    text-align: center;
    margin-top:10px;
    margin-bottom:10px;
    width:100%;
  }
  progress{
    margin-top: 10px;
  }

</style>
