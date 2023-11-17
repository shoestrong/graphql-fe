<template>
  <!-- <div class="apollo">
    <h1>This is an apollo-client demo</h1>
    <div class="container">
      <div v-if="$apollo.loading">Loading...</div>
      <div class="article" v-for="item in articles" :key="item.id">
        <router-link
          :class="{isRead: item.isRead}"
          @click.native="mutationIsRead(item.id)"
          :to="{ name: 'content', params: { id: item.id } }"
        >{{ item.title }}</router-link>
        <time>{{ item.date }}</time>
        <div class="content">
          <h2>前言</h2>
          <p>{{ item.introduction }}</p>
        </div>
        <hr>
      </div>
    </div>
    <ul class="category">
      <li v-for="item in categories" :key="item.name">{{ item.name }} ({{ item.num }})</li>
    </ul>
  </div> -->
  <div class="container">
    <div v-if="$apollo.loading">Loading...</div>
    <div class="row" v-else>
      <div class="col-md-6" >
        <div class="panel panel-default" style="padding: 20px">
          <div class="panel-header">
            <AddProduct :categories="categories" @updateProduct="handleProductList"/>
          </div>
          <div class="text-center" style="height: 400px, overflow: scroll">
            <ProductList :products="products" @getProduct="handleProduct"/>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="panel panel-default" style="padding: 20px">
          <div class="text-center">
            <ProductDetail :product="product" @delete="handleDeleteProduct"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import ProductDetail from "./ProductDetail";

const fetchDataGql = gql`
  {
    getProducts {
      id
      name
      category {
        id
        name
      }
    }
    getCategories {
      id
      name
    }
  }
`;

// const mArticleISRead = require("../graphql/ArticleIsRead.gql");

const product = require("../graphql/Product.gql");

export default {
  name: "Apollo",
  components: {ProductList, AddProduct, ProductDetail},
  data() {
    return {
      product: null,
      products: [],
      categories: []
    };
  },
  methods: {
    // mutationIsRead(id) {
    //   this.$apollo.mutate({
    //     mutation: mArticleISRead,
    //     variables: {
    //       id
    //     },
    //     update: (store, { data: { articleIsRead } }) => {
    //       console.log(articleIsRead);
    //     }
    //   });
    // },
    handleProduct(id) {
      this.$apollo.mutate({
        mutation: product,
        variables: {
          id
        },
        update: (store, { data }) => {
          this.product = data.getProduct
        }
      });
    },
    handleProductList() {
      const vm = this;
      this.$apollo.mutate({
        mutation: fetchDataGql,
        variables: {},
        update: (store, { data }) => {
          vm.products = data.getProducts;
          vm.categories = data.getCategories;
        }
      });
    },
    handleDeleteProduct() {
      this.handleProductList()
      this.product = null
    }
  },
  apollo: {
    fetchData() {
      const vm = this;
      return {
        query: fetchDataGql,
        update(data) {
          vm.products = data.getProducts;
          vm.categories = data.getCategories;
        }
      };
    }
  }
};
</script>

<style scoped>
.apollo .container {
  width: 900px;
  margin: 0 auto;
}

.apollo .article {
  text-align: left;
  margin: 1.6rem 0 2rem;
}

.apollo .article a {
  display: block;
  margin-bottom: 0.3rem;
  border-bottom: 1px solid #eee;
  color: #2e2e2e;
  text-decoration: none;
  font-size: 1.4rem;
}

.apollo .article a.isRead {
  opacity: 0.4;
}

.apollo hr {
  margin: 2rem auto;
  width: calc(100% - 4px);
  border: 2px dashed #a4d8fa;
  background: #fff;
}

.category {
  position: fixed;
  top: 200px;
  right: 230px;
}
</style>
