<template>
  <section class="modal">
    <Button
      icon="pi pi-fw pi-times"
      class="p-button-danger btn-close"
      @click="toggleModal"
    />
    <div class="modal-content">
      <Card>
        <template #header>
          <img alt="user avatar" :src="post.image" />
        </template>
        <template #title>
          <div class="flex-v-center">
            <Avatar :image="post.image" shape="circle" />
            {{ post.userId.name }}
          </div>
        </template>
        <template #content>
          {{ post.content }}
        </template>

        <template #footer>
          <span class="p-buttonset">
            <Button icon="pi pi-heart" />
            <Button icon="pi pi-pencil" />
            <Button icon="pi pi-trash" />
          </span>
        </template>
      </Card>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Modal',
  methods: {
    toggleModal() {
      this.$store.commit('toggle_modal');
    },
  },
  computed: {
    ...mapGetters(['post']),
  },
};
</script>

<style scoped>
.btn-close {
  position: absolute;
  top: 0rem;
  right: 1.1rem;
  z-index: 1000;
}
</style>
