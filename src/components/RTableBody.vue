<template>
  <div>
    <div v-for="(item,index) in items" :key="index">

      <span v-for="(header,i) in headers" :key="i" class="header">
        {{item[header.value]}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RTableBody',
  props: {
    items: {type: Array},
    headers: {type: Array}
  },
  mounted () {
    console.log(this.items)
  }
}
</script>

<style scoped>
.header{
  display: inline-block;
  margin-left: 20px;
}
</style>
