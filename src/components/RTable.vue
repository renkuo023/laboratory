<template>
  <div>
    <r-table-header
      :loading="loading"
      :headers = 'headers'>
    </r-table-header>
    <r-table-body
      :items="items"
      :headers = 'headers'
    >
    </r-table-body>
    <r-table-footer
      :pagination="pagination"
      :total-items="totalItems"
      >
    </r-table-footer>
  </div>
</template>

<script>
import RTableHeader from './RTableHeader'
import RTableBody from './RTableBody'
import RTableFooter from './RTableFooter'
export default {
  name: 'RTable',
  components: {RTableFooter, RTableBody, RTableHeader},
  data () {
    return {
    }
  },
  props: {
    headers: {type: Array},
    items: {type: Array},
    pagination: {type: Object},
    totalItems: {type: Number},
    loading: {type: Boolean}
  }
}
</script>

<style scoped>

</style>
