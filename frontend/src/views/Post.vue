<template>
  <Card>
    <template #header>
      <img alt="user avatar" :src="data.image" @click="toggleModal(data)" />
      <!-- <Avatar :image="require(`@/assets/300.jpg`)" size="xlarge" /> -->
    </template>
    <template #title>
      <div class="flex-v-center">
        <Avatar :image="data.image" shape="circle" />
        <!-- {{ data.userId.name }} -->
      </div>
    </template>
    <template #content>
      {{ data.content }}
    </template>

    <template #footer>
      <span class="p-buttonset">
        <Button icon="pi pi-heart" @click.prevent="like(data._id)" />
        <Button icon="pi pi-pencil" @click.prevent="edit(data._id)" />
        <Button icon="pi pi-trash" @click.prevent="remove(data._id)" />
      </span>
    </template>
  </Card>
</template>

<script>
export default {
  name: 'Post',
  props: ['data'],
  methods: {
    toggleModal(post) {
      this.$store.commit('toggle_modal');
      this.$store.dispatch('post', post);
    },
    like(id) {
      console.log('like');
      console.log(id);
    },
    edit(id) {
      console.log(id);
      console.log('edit');
    },
    remove(id) {
      this.$store.dispatch('del_post', id).then(() => {
        this.$store.dispatch('posts');
      });
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
