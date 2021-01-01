<template>
  <div>
    {{pagination.rowsPerPage}}
    ---
    {{totalItems}}
  </div>
</template>

<script>
export default {
  name: 'RTableFooter',
  props: {
    pagination: {type: Object},
    totalItems: {type: Number}
  }
}
</script>

<style scoped>

</style>
