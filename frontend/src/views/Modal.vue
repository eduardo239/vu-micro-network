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
          <router-link :to="'/profile/' + post.userId._id">
            <div class="flex-v-center">
              <Chip
                :label="post.userId.name"
                :image="post.userId.imageAvatar"
                class="p-mr-2 p-mb-2 custom-chip"
              />
            </div>
          </router-link>
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
.custom-chip {
  background: var(--primary-color);
  color: var(--primary-color-text);
}

.btn-close {
  position: absolute;
  top: 0rem;
  right: 1.1rem;
  z-index: 1000;
}
</style>
