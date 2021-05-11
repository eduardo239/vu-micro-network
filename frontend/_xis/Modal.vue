<template>
  <div class="modal">
    <div class="modal-body p-shadow-1">
      <img :src="post.image" :alt="post.user" />
      <h3>{{ post.user }}</h3>
      <p>{{ post.content }}</p>
      <span class="p-buttonset">
        <Button icon="pi pi-heart" />
        <Button icon="pi pi-pencil" />
        <Button icon="pi pi-trash" />
      </span>
      <h3>Comments</h3>
      <Comments :comments="post.comments" />
      {{ post }}
    </div>
    <Button @click="toggleModal" label="Close" class="p-button-danger close" />
  </div>
</template>

<script>
import Comments from './Comments';
import { mapGetters } from 'vuex';

export default {
  name: 'Modal',
  components: { Comments },
  methods: {
    toggleModal() {
      this.$store.commit('toggleModal');
    },
  },
  computed: {
    ...mapGetters(['post']),
  },
};
</script>

<style scoped>
.close {
  position: absolute;
  top: 0;
  right: 1rem;
  width: auto;
}
</style>
