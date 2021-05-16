<template>
  <section>
    <form v-if="this.$store.getters.isLoggedIn" class="p-mx-2 p-my-3">
      <Textarea
        style="width: 100%"
        v-model="content"
        :autoResize="true"
        rows="3"
        placeholder="Comment here.."
      />
      <Button
        v-if="!loading"
        style="width: 100%; paddingRight: 2rem"
        label="Send"
        type="submit"
        @click.prevent="new_comment(post._id)"
      />
      <Button
        v-else
        icon="pi pi-spin pi-spinner"
        style="width: 100%; paddingRight: 2rem"
        label="Sending"
        type="submit"
      />
    </form>
    <!-- alert -->
    <Message style="margin: 0" v-if="error" severity="warn">{{
      error
    }}</Message>
    <!-- comments -->
    <div
      v-for="comment in post.comments.slice().reverse()"
      :key="comment._id"
      class="App-comments flex-h-space"
    >
      <!-- {{ comment }} -->
      <div class="flex-v-start">
        <router-link :to="`/profile/${comment.userId._id}`">
          <Chip
            :label="comment.userId.name"
            :image="
              comment.userId.imageAvatar || require('../assets/avatar1.svg')
            "
            class="p-mr-2 p-mb-2 custom-chip"
          />
        </router-link>
        <p class="App-comment">
          {{ comment.content }}
        </p>
      </div>

      <div class="Buttons flex-v-start">
        <Button
          class="p-button-sm
            p-button-rounded p-button-text"
          :label="comment.likes.toString()"
          icon="pi pi-heart"
          @click="commentLike(post._id, comment._id)"
        />

        <Button
          class="p-button-sm
            p-button-rounded p-button-text"
          icon="pi pi-trash"
          @click="commentDelete(post._id, comment._id)"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Comments',
  props: ['post'],
  data() {
    return {
      content: '',
      loading: false,
      error: '',
    };
  },
  methods: {
    async new_comment(postId) {
      if (!this.content) return (this.error = 'Please enter a valid value.');
      this.loading = true;
      try {
        const data = { postId: postId, content: this.content };
        await this.$store.dispatch('new_comment', data);
        await this.$store.dispatch('post', postId);
      } catch (error) {
        console.log(error);
      } finally {
        this.content = '';
        this.loading = false;
      }
    },
    async commentLike(postId, commentId) {
      await this.$store.dispatch('like_comment', commentId);
      await this.$store.dispatch('post', postId);
    },

    async commentDelete(postId, commentId) {
      await this.$store.dispatch('delete_comment', commentId);
      await this.$store.dispatch('post', postId);
    },
  },
};
</script>

<style scoped></style>
