<template>
  <div>
    <slot name="search_history"></slot>
    <slot name="history_list"></slot>
    <slot name="clear_all_history"></slot>
  </div>
</template>

<script>
  export default {
    name: "SearchHistory"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
