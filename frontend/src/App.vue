<template>
  <div class="App">
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './views/Menu.vue';
import axios from 'axios';

export default {
  components: { Menu },
  mounted() {
    this.$store.dispatch('posts');
    this.$store.dispatch('auto_login');
  },
  created() {
    axios.interceptors.response.use(undefined, function(err) {
      // eslint-disable-next-line
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout');
        }
        throw err;
      });
    });
  },
};
</script>

<style scoped>
.App {
  max-width: 800px;
  margin: 0 auto;
}
</style>
