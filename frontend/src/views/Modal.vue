<template>
  <section class="modal" @click="outsideClick">
    <div class="modal-content" v-if="post" ref="modalContent">
      <Card>
        <template #header>
          <img alt="user avatar" :src="post.image" />
        </template>
        <template #title>
          <div class="flex-v-center">
            <router-link
              :to="{ name: 'profile', params: { id: post.userId._id } }"
            >
              <Chip
                :label="post.userId.name"
                :image="
                  post.userId.imageAvatar || require('../assets/avatar1.svg')
                "
                class="p-mr-2 p-mb-2 custom-chip"
              />
            </router-link>

            <span class="date"
              >{{ fromNow(new Date(post.createdAt)) }} ago</span
            >
          </div>
        </template>
        <template #content>
          <p>{{ old_content }}</p>
          <Dialog header="Edit Content" :visible="display" closable>
            <div class="p-field">
              <InputText
                v-model="new_content"
                id="content"
                type="text"
                :placeholder="old_content"
              />
            </div>

            <template #footer>
              <Button
                label="Cancel"
                icon="pi pi-times"
                class="p-button-text"
                @click="closeEdit"
              />
              <Button
                label="Save"
                icon="pi pi-save"
                autofocus
                @click.prevent="edit(post._id)"
              />
            </template>
          </Dialog>
        </template>

        <template #footer>
          <span class="p-buttonset">
            <Button
              :label="post.likes.toString()"
              icon="pi pi-heart"
              @click.prevent="like(post._id)"
            />
            <Button icon="pi pi-pencil" @click.prevent="edit(post._id)" />
            <ConfirmPopup></ConfirmPopup>
            <Button
              icon="pi pi-trash"
              @click.prevent="remove($event, post._id)"
            />
          </span>
        </template>
      </Card>
      <Comments :post="post" />
    </div>
    <div v-else>
      <ProgressSpinner
        style="width:30px;height:30px"
        strokeWidth="3"
        fill="none"
        animationDuration=".5s"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Comments from './Comments';
import { fromNow } from '../helper/dates';

export default {
  name: 'Modal',
  components: { Comments },
  data() {
    return {
      new_content: '',
      old_content: '',
      modalContent: '',
      display: false,
    };
  },
  methods: {
    fromNow,
    toggleModal() {
      this.$store.commit('toggle_modal');
    },
    async like(id) {
      await this.$store.dispatch('post_like', id);
      await this.$store.dispatch('post', id);
    },
    async edit(id) {
      this.$store.commit('RESET_ERROR');

      this.display = true;
      await this.$store.dispatch('update_post', {
        id,
        content: this.new_content,
      });
      await this.$store.dispatch('posts');
      await this.$store.dispatch('post', id);
      let q = this.$route.query;
      await this.$store.dispatch('postsPerPage', q);
    },
    closeEdit() {
      this.display = false;
    },
    async remove(event, id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          this.$store.commit('toggle_modal');
          await this.$store.dispatch('del_post', id);
          let q = this.$route.query;
          await this.$store.dispatch('postsPerPage', q);
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
    outsideClick(e) {
      if (this.modalContent && !this.inplaceRef)
        if (this.modalContent && !this.modalContent.contains(e.target)) {
          this.$store.commit('toggle_modal');
        }
    },
  },
  computed: {
    ...mapGetters(['post']),
  },
  mounted() {
    this.old_content = this.post.content;
    this.new_content = this.old_content;
    this.modalContent = this.$refs.modalContent;
    this.inplaceRef = this.$refs.inplaceRef;
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
