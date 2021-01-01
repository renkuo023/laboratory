<template>
  <div>
    <div v-for="(item,index) in headers" :key="index" class="header">
      <span>
        {{item.text}}
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RTableHeader',
  props: {
    headers: {type: Array},
    loading: {type: Boolean}
  },
  mounted () {
  }
}
</script>

<style scoped>
.header{
  display: inline-block;
  margin-left: 20px;
}
</style>
