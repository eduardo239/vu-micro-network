<template>
  <div class="App">
    <h4 v-if="$store.getters.login.user">
      {{ $store.getters.login.user.name }}
    </h4>
    {{ $store.getters.error }}
    <Menu />
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Menu from './views/Menu.vue';
import axios from 'axios';

export default {
  components: { Menu },
  mounted() {},
  created() {
    // this.$store.dispatch('posts');
    this.$store.dispatch('auto_login');
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

<style>
.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
