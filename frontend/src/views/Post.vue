<template>
  <div>
    <Card class="p-mb-3">
      <template #header>
        <img
          alt="user avatar"
          :src="data.image"
          @click="toggleModal(data._id)"
        />
      </template>
      <template #title>
        <div class="flex-v-center">
          <router-link :to="`/profile/${data.userId._id}`">
            <Chip
              @click="userProfile(data.userId._id)"
              :label="data.userId.name"
              :image="
                data.userId.imageAvatar || require('../assets/avatar1.svg')
              "
              class="p-mr-2 p-mb-2 custom-chip"
            />
          </router-link>
        </div>
      </template>
      <template #content>
        {{ data.content }}
      </template>

      <template #footer>
        <span class="p-buttonset">
          <Button
            :label="data.likes.toString()"
            icon="pi pi-heart"
            @click.prevent="like(data._id)"
          />
          <Button icon="pi pi-trash" @click.prevent="remove(data._id)" />
        </span>
      </template>
    </Card>
  </div>
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
      await this.$store.dispatch('posts');
    },

    async remove(id) {
      alert(id);
      await this.$store.dispatch('del_post', id);
      await this.$store.dispatch('posts');
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
