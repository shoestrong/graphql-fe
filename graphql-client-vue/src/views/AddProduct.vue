<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="product_name">商品名称</label>
      <input class="form-control" id="product_name" placeholder="商品名称" v-model="product" />
    </div>
    <div class="form-group">
      <label for="categoryId">商品分类</label>
      <select class="form-control" id="categoryId" v-model="categoryId">
        <option>请选择分类</option>
        <option :key="item.id" :value="item.id" v-for="item in categories">{{item.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <input class="btn btn-primary" type="submit"/>
    </div>
  </form>
</template>

<script>
import { PRODUCTS, ADD_PRODUCT } from '../apollo/query';
export default {
  props: ['categories'],
  data() {
    return {
      product: '',
      categoryId: ''
    }
  },
  methods: {
    handleSubmit(e) {
      const vm = this;
      if (!vm.product || !vm.categoryId) {
        alert('请填写产品和选择分类')
        return false
      }
      this.$apollo.mutate({
        mutation: ADD_PRODUCT,
        variables: {
          name: this.product,
          categoryId: this.categoryId
        },
        update: (store, { data }) => {
          console.log(data);
          vm.product = ''
          vm.categoryId = ''
          vm.$emit('updateProduct')
        }
      });
      return false
    }
  }
}
</script>

<style>

</style>