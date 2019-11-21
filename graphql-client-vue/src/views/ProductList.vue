<template>
  <table class="table table-striped">
    <caption class="text-center">产品列表</caption>
    <thead>
      <tr class="active">
        <td>名称</td>
        <td>分类</td>
      </tr>
    </thead>
    <tbody>
      <tr :key="item.id+index" v-for="(item, index) in products" @click="handleClick(item.id)">
        <td>{{item.name}}</td>
        <td>{{item.category.name}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    handleClick(id) {
      this.$emit('getProduct', id)
    }
  }
}
</script>

<style scoped>
.table {
  margin-bottom: 0;
}
</style>