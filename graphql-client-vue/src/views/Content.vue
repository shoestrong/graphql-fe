<template>
  <div class="content">
    <ApolloQuery :query="require('../graphql/ArticleContent.gql')" :variables="{ id }">
      <template v-slot="{ result: { data } }">
        <template v-if="data">
          <div>ID: {{data.getArticleContent.id}}</div>
          <div v-html="data.getArticleContent.html"></div>
        </template>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import gql from "graphql-tag";
// import ArticleContent from '../graphql/ArticleContent.gql'

export default {
  name: "Content",
  computed: {
    id() {
      return this.$route.params.id ? +this.$route.params.id : 1;
    }
  },
  created() {
    // let vm = this
    // this.$apollo.mutate({
    //   mutation: ArticleContent,
    //   variables: {
    //     id: vm.id
    //   },
    //   update(store, { data: data }) {
    //     console.log(data);
    //   }
    // });
  },
  apollo: {
    fetchData() {
      const vm = this;
      return {
        query: gql`
          {
            getArticleContent(id: ${vm.id}) {
              id
              html
            }
          }
        `,
        update(data) {
          console.log(data)
        }
      };
    }
  }
};
</script>

<style>
</style>