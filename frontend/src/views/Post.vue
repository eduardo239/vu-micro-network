<template>
  <Card>
    <template #header>
      <img alt="user avatar" :src="data.image" @click="toggleModal(data._id)" />
    </template>
    <template #title>
      <div class="flex-v-center">
        <Chip
          :label="data.userId.name"
          :image="data.userId.imageAvatar"
          class="p-mr-2 p-mb-2 custom-chip"
        />
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
