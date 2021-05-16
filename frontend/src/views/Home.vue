<template>
  <div>
    <New />
    <div v-if="postsPerPage.length > 0">
      <section v-for="post in postsPerPage" :key="post._id">
        <Post :data="post" />
      </section>
    </div>
    <div v-else>
      <Message severity="info">Posts not found</Message>
    </div>
    <Modal v-if="$store.getters.modal" />
    <Paginator />
  </div>
</template>

<script>
import New from './New';
import Post from './Post';
import Modal from './Modal';
import Paginator from './Paginator';
import { mapGetters } from 'vuex';

export default {
  components: { New, Post, Modal, Paginator },
  computed: {
    ...mapGetters(['postsPerPage']),
  },
  unmounted() {
    if (this.$store.getters.modal) {
      this.$store.commit('toggle_modal');
    }
  },
};
</script>

<style></style>
