<template>
  <section class="p-p-5">
    <label for="avatar">
      <Avatar
        class="avatar"
        :image="user_info.user.imageAvatar"
        size="xlarge"
        shape="circle"
      />
      <input
        style="display: none"
        type="file"
        name="avatarHidden"
        id="avatar"
        ref="avatar"
        @change="onChange"
      />
    </label>
    <h4>
      {{ user_info.name }}
    </h4>
    <span class="p-buttonset p-mt-3">
      <Button label="Add" icon="pi pi-check" />
      <Button label="Remove" icon="pi pi-times" class="p-button-danger" />
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
    };
  },
  created() {
    this.$store.dispatch('get_user', this.$route.params.id);
  },
  methods: {
    onChange() {
      this.loading = true;

      const file = this.$refs.avatar.files[0];

      const formData = new FormData();
      formData.append('avatar', file);

      this.$store.dispatch('update_avatar', formData).then(() => {
        this.$store.dispatch('get_user', this.$route.params.id).then(() => {
          this.$store.dispatch('posts');
        });
      });
    },
  },
  computed: {
    ...mapGetters(['user_info']),

    userId() {
      return this.$route.params.userId; // TODO
    },
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
