<template>
  <section class="p-p-5">
    <div
      v-if="user_info.user !== undefined"
      class="p-grid p-jc-center p-ai-center vertical-container p-mt-3"
    >
      <label for="avatar" v-if="!loading">
        <Avatar
          class="avatar"
          :image="
            user_info.user.imageAvatar || require('../assets/avatar1.svg')
          "
          size="xlarge"
          shape="circle"
        />
        <p style="color: white; text-align: center">
          {{ user_info.user.name }}
        </p>

        <input
          style="display: none"
          type="file"
          name="avatarHidden"
          id="avatar"
          ref="avatar"
          @change="onChange"
        />
      </label>
    </div>
    <div v-else class="p-grid p-jc-center p-ai-center vertical-container p-p-4">
      <ProgressSpinner
        style="width:30px;height:30px"
        strokeWidth="3"
        fill="none"
        animationDuration=".5s"
      />
    </div>

    <span class="p-buttonset p-mt-3">
      <Button
        label="Add"
        icon="pi pi-check"
        @click="addFriend(user_info.user)"
      />
      <Button
        label="Remove"
        icon="pi pi-times"
        class="p-button-danger"
        @click="removeFriend(user_info.user)"
      />
    </span>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  data() {
    return {
      loading: false,
      file: '',
      error: '',
    };
  },
  async created() {
    await this.$store.dispatch('get_user', this.$route.params.id);
  },

  async mounted() {},
  methods: {
    async onChange() {
      this.loading = true;

      const file = this.$refs.avatar.files[0];
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        await this.$store.dispatch('update_avatar', formData);
        await this.$store.dispatch('get_user', this.$route.params.id);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    addFriend(user) {
      console.log(user);
    },
    removeFriend(user) {
      console.log(user);
    },
  },
  computed: {
    ...mapGetters(['user_info', 'user']),
  },
  unmounted() {
    this.$store.dispatch('reset_user');
  },
};
</script>

<style scoped>
.avatar {
  cursor: pointer;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
</style>
