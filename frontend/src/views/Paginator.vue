<template>
  <section>
    <div class="flex-v-center flex-h-center" style="gap: 0.25rem; width: 100%">
      <Button
        @click="handleClick(-1)"
        icon="pi pi-angle-left"
        :disabled="this.page === 0"
      />
      <!-- <InputNumber v-model="perPage" :min="0" :max="10" /> -->
      <Button @click="handleClick(1)" :label="page.toString()" />
      <Button @click="handleClick(1)" icon="pi pi-angle-right" />
    </div>
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
      if (this.page > 0) {
        this.q = { page: this.page, limit: this.perPage };
        this.$router.push({
          name: 'home',
          query: this.q,
        });
      } else if (this.page === 0) {
        this.$router.push({});
      } else {
        this.page = 0;
      }
    },
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
