<template>
  <div v-if="product">
    <h5>详情</h5>
    <pre style="white-space: pre-line;text-align: left;">
      {{JSON.stringify(product,null,"&nbsp;&nbsp;&nbsp;&nbsp;")}}
    </pre>
    <div>
      <button class="btn btn-danger btn-xs" @click="deletePro(product.id)">删除</button>
    </div>
  </div>
  <div v-else>
    Product Detail
  </div>
</template>

<script>
import { DELETE_PRODUCT } from '../apollo/query';

export default {
  props: ['product'],
  methods: {
    deletePro(id) {
      this.$apollo.mutate({
        mutation: DELETE_PRODUCT,
        variables: {
          id
        },
        update: (store, { data }) => {
          console.log(data);
          this.$emit('delete', data)
        }
      });
    }
  }
}
</script>

<style>

</style>