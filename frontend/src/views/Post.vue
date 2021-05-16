<template>
  <Card class="p-mb-3">
    <template #header>
      <img alt="user avatar" :src="data.image" @click="toggleModal(data._id)" />
    </template>
    <template #title>
      <div class="flex-v-center">
        <router-link :to="{ name: 'profile', params: { id: data.userId._id } }">
          <Chip
            :label="data.userId.name"
            :image="data.userId.imageAvatar || require('../assets/avatar1.svg')"
            class="p-mr-2 p-mb-2 custom-chip"
          />
        </router-link>
      </div>
    </template>
    <template #content>
      <span>
        {{ data.content }}
      </span>
    </template>

    <template #footer>
      <span class="p-buttonset">
        <Button
          :label="data.likes.toString()"
          icon="pi pi-heart"
          @click.prevent="like(data._id)"
        />
        <ConfirmPopup></ConfirmPopup>
        <Toast />
        <Button icon="pi pi-trash" @click.prevent="remove(data._id)" />
      </span>
    </template>
  </Card>
</template>

<script>
export default {
  name: 'Post',
  data() {
    return {
      messages: [],
    };
  },
  props: ['data'],
  methods: {
    async toggleModal(id) {
      await this.$store.dispatch('post', id);
      this.$store.commit('toggle_modal');
    },
    async like(id) {
      await this.$store.dispatch('post_like', id);
      let q = this.$route.query;
      await this.$store.dispatch('postsPerPage', q);
    },

    async remove(id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Post deleted',
            life: 3000,
          });
          // TODO check if user is logged in && user is the owner
          await this.$store.dispatch('del_post', id);
          let q = this.$route.query;
          await this.$store.dispatch('postsPerPage', q);
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000,
          });
        },
      });
    },
    userProfile(id) {
      this.$router.push(`/profile/${id}`); // FIXME
    },
  },
};
</script>

<style scoped>
img {
  transition: 0.2s ease-in-out;
}
img:hover {
  cursor: pointer;
}
</style>
