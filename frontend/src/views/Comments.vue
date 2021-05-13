<template>
  <section>
    <div v-for="comment in post.comments" :key="comment._id">
      {{ comment }}
      <Card>
        <template #title>
          <router-link :to="`/profile/${comment.userId._id}`">
            <Chip
              :label="comment.userId.name"
              :image="
                comment.userId.imageAvatar || require('../assets/avatar1.svg')
              "
              class="p-mr-2 p-mb-2 custom-chip"
            />
          </router-link>
        </template>
        <template #content>
          {{ comment.content }}
        </template>
        <template #footer>
          <Button icon="pi pi-heart" @click="commentLike(comment._id)" />
          <Button icon="pi pi-pencil" @click="commentEdit(comment._id)" />
          <Button icon="pi pi-trash" @click="commentDelete(comment._id)" />
        </template>
      </Card>
    </div>
    <form @submit.prevent="new_comment(post._id)">
      <Textarea
        style="width: 100%"
        v-model="content"
        :autoResize="true"
        rows="5"
        cols="30"
      />
      <Button
        style="width: 100%"
        label="Send"
        type="submit"
        @click.prevent="new_comment(post._id)"
      />
    </form>
  </section>
</template>

<script>
export default {
  name: 'Comments',
  props: ['post'],
  data() {
    return {
      content: '',
    };
  },
  methods: {
    async new_comment(postId) {
      const data = { postId: postId, content: this.content };
      await this.$store.dispatch('new_comment', data);
      await this.$store.dispatch('post', postId);
    },
    commentLike() {
      console.log('like');
    },
    commentEdit() {
      console.log('edit');
    },
    commentDelete() {
      console.log('del');
    },
  },
};
</script>

<style></style>
