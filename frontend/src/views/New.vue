<template>
  <div v-if="this.$store.getters.isLoggedIn">
    <form
      v-if="!loading"
      class="p-inputgroup p-mb-2"
      enctype="multipart/form-data"
    >
      <FileUpload
        mode="basic"
        name="demo[]"
        accept="image/*"
        chooseLabel="Image"
        ref="file"
        @change="onSelect"
      />
      <InputText placeholder="Vote" v-model="content" />
      <Button
        icon="pi pi-send"
        class="p-button-primary"
        @click.prevent="onSubmit"
      />
    </form>
    <div v-else class="p-grid p-jc-center p-ai-center vertical-container p-p-4">
      <ProgressSpinner
        style="width:50px;height:50px"
        strokeWidth="1"
        fill="none"
        animationDuration=".5s"
      />
    </div>
    <div v-if="error">
      <Message severity="info">{{ error }}</Message>
    </div>
  </div>

  <div v-else>
    <Message severity="info">You must be logged in to post.</Message>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'New Post',
  data() {
    return {
      image: '',
      content: '',
      userId: '',
      loading: false,
      error: '',
    };
  },
  methods: {
    onSelect() {
      this.error = '';
      const file = this.$refs.file.files[0];
      this.image = file;
    },
    async onSubmit() {
      if (!this.image || !this.content) {
        this.error = 'Empty content and/or image.';
        return;
      }
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append('userId', this.user_id.user._id);
        formData.append('content', this.content);

        await this.$store.dispatch('new_post', formData);
        await this.$store.dispatch('posts');

        this.image = '';
        this.content = '';
      } catch (error) {
        this.error = 'Erro ao criar um novo post.';
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters(['user']),
    user_id() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style></style>
