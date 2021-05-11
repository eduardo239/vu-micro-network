<template>
  <div class="p-col-12 p-md-12">
    <New />
    <div v-if="posts.length > 0">
      <section v-for="post in posts" :key="post._id">
        <Post :data="post" />
      </section>
    </div>
    <div v-else>
      <Message severity="info">Posts not found</Message>
    </div>
    <Modal v-if="$store.getters.modal" />
  </div>
</template>

<script>
import New from './New';
import Post from './Post';
import Modal from './Modal';
import { mapGetters } from 'vuex';

export default {
  components: { New, Post, Modal },
  computed: {
    ...mapGetters(['posts']),
  },
};
</script>

<style></style>
