<template>
  <section>
    <!-- <Button v-if="page != 1" @click="page--" icon="pi pi-angle-left" />
    <Button
      v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
      @click="page = pageNumber"
      icon="pi pi-angle-left"
      :key="index"
      >{{ pageNumber }}</Button
    >
    <Button
      v-if="page < page.length"
      @click="page++"
      icon="pi pi-angle-right"
    /> -->
    <div class="flex-v-center flex-h-center" style="gap: 0.25rem; width: 100%">
      <Button @click="handleClick(-1)" icon="pi pi-angle-left" />
      <InputNumber
        v-model="perPage"
        :min="0"
        :max="10"
        showButtons
        buttonLayout="vertical"
      />
      <Button @click="handleClick(1)" icon="pi pi-angle-right" />
    </div>
    <!-- <div v-for="(p, i) in displayedPosts" :key="i">
      {{ p.content }}
      <hr />
    </div> -->
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Paginator',
  data() {
    return {
      posts: [],
      page: 0,
      pages: [],
      perPage: 3,
      q: {},
    };
  },
  computed: {
    ...mapGetters({ getPosts: 'posts' }),
    // displayedPosts() {
    //   return this.paginate(this.posts);
    // },
  },
  created() {
    this.$store.dispatch('postsPerPage', {
      page: this.page,
      limit: this.perPage,
    });
  },

  methods: {
    handleClick(x) {
      this.page += x;
      this.q = { page: this.page, limit: this.perPage };
      this.$router.push({
        name: 'home',
        query: this.q,
      });
    },
    // paginate(posts) {
    //   let page = this.page;
    //   let perPage = this.perPage;
    //   let from = page * perPage - perPage;
    //   let to = page * perPage;
    //   return posts.slice(from, to);
    // },
    // setPages() {
    //   let numberOfPages = Math.ceil(this.posts.length / this.perPage);
    //   for (let i = 1; i < numberOfPages; i++) {
    //     this.pages.push(i);
    //   }
    // },
  },
  watch: {
    page() {
      this.$store.dispatch('postsPerPage', {
        page: this.page,
        limit: this.perPage,
      });
    },
  },
};
</script>

<style></style>
