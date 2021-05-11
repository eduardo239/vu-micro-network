<template>
  <div class="p-grid p-fluid">
    <div class="p-col-12">
      <div class="p-inputgroup">
        <FileUpload
          mode="basic"
          name="demo[]"
          accept="image/*"
          :maxFileSize="1000000"
          chooseLabel="Image"
          ref="file"
          @change="onSelect"
          :disabled="loading"
        />
        <InputText
          placeholder="New post.."
          v-model="post.content"
          :disabled="loading"
        />
        <Button
          icon="pi pi-send"
          class="p-button-primary"
          @click="onSubmit"
          :disabled="loading"
        />
      </div>
      <div v-if="loading">
        <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { _newPost } from '../api/posts';

export default {
  data() {
    return {
      value2: '',
      loading: false,
      post: {
        content: '',
        image: null,
        userId: 'not found',
      },
      response: 'null',
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;

        const formData = new FormData();
        formData.append('image', this.post.image);
        formData.append('userId', this.$store.getters.login._id);
        formData.append('content', this.post.content);

        this.response = await _newPost(formData);
        this.$store.dispatch('getPosts');

        this.post.image = null;
        this.post.content = '';
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    onSelect() {
      const file = this.$refs.file.files[0];
      this.post.image = file;
    },
  },
  computed: {
    ...mapGetters(['login']),
  },
};
</script>

<style></style>
