<template>
  <section class="modal">
    <Button
      icon="pi pi-fw pi-times"
      class="p-button-danger btn-close"
      @click="toggleModal"
    />
    <div class="modal-content">
      <Card>
        <template #header>
          <img alt="user avatar" :src="post.image" />
        </template>
        <template #title>
          <div class="p-grid p-ai-center vertical-container">
            <Chip
              :label="post.userId.name"
              :image="post.userId.imageAvatar"
              class="p-mr-2 p-mb-2 custom-chip"
            /><span class="date">{{ post.createdAt }}</span>
          </div>
        </template>
        <template #content>
          <Inplace :closable="true">
            <template #display>
              {{ old_content || 'Click to Edit' }}
            </template>
            <template #content>
              <Textarea
                class="textarea"
                v-model="old_content"
                autoFocus
                :autoResize="true"
                rows="5"
              />
              <Button icon="pi pi-save" @click.prevent="edit(post._id)" />
            </template>
          </Inplace>
        </template>

        <template #footer>
          <span class="p-buttonset">
            <Button
              :label="post.likes.toString()"
              icon="pi pi-heart"
              @click.prevent="like(post._id)"
            />
            <ConfirmDialog></ConfirmDialog>
            <Button icon="pi pi-trash" @click.prevent="remove(post._id)" />
          </span>
        </template>
      </Card>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Modal',
  data() {
    return {
      new_content: '',
      old_content: '',
    };
  },
  methods: {
    toggleModal() {
      this.$store.commit('toggle_modal');
    },
    async like(id) {
      await this.$store.dispatch('post_like', id);
      await this.$store.dispatch('post', id);
    },
    async edit(id) {
      this.new_content = this.old_content;
      this.$confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          await this.$store.dispatch('update_post', {
            id,
            content: this.new_content,
          });
          await this.$store.dispatch('post', id);
          await this.$store.dispatch('posts');
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
    async remove(id) {
      this.$confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          this.$store.commit('toggle_modal');
          await this.$store.dispatch('del_post', id);
          await this.$store.dispatch('posts');
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
  },
  computed: {
    ...mapGetters(['post']),
  },
  mounted() {
    this.old_content = this.post.content;
  },
};
</script>

<style scoped>
.btn-close {
  position: absolute;
  top: 0rem;
  right: 1.1rem;
  z-index: 1000;
}
.textarea {
  width: 100%;
}
.p-inplace-display {
  padding: 0.1rem !important; /*TODO*/
}
</style>
