<template>
  <form class="p-inputgroup p-mb-2" enctype="multipart/form-data">
    <FileUpload
      mode="basic"
      name="demo[]"
      accept="image/*"
      chooseLabel="Image"
      ref="file"
      @change="onSelect"
      :disabled="loading"
    />
    <InputText placeholder="Vote" v-model="content" :disabled="loading" />
    <Button
      icon="pi pi-send"
      class="p-button-primary"
      @click="onSubmit"
      :disabled="loading"
    />
  </form>
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
      const file = this.$refs.file.files[0];
      this.image = file;
    },
    onSubmit() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append('userId', this.user_id.user._id);
        formData.append('content', this.content);

        this.$store.dispatch('new_post', formData).then(() => {
          this.$store.dispatch('posts');
        });

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
