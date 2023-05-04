<template>
  <div>
    <div v-for="(item,index) in list" :key="index">
      <ItemTask :daily="item" />
    </div>
  </div>
</template>
<script>
import ItemTask from '~/components/token/itemTask.vue'
export default {
  components: {
    ItemTask
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
