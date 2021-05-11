<template>
  <div class="post p-pb-5 p-my-2">
    <img :src="post.image" alt="post" class="post-image" @click="toggleModal" />
    <p>{{ post.content }}</p>
    <div class="buttons">
      <span class="p-buttonset">
        <Button icon="pi pi-heart" />
        <Button icon="pi pi-pencil" />
        <Button icon="pi pi-trash" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    toggleModal() {
      this.$store.commit('toggleModal');
    },
  },
};
</script>

<style scoped>
.post {
  background: #fff;
  max-width: 600px;
  margin: 0 auto;
}
.post-image {
  border: 1px solid black;
}
.post-image:hover {
  cursor: pointer;
  filter: brightness(110%);
}
</style>
