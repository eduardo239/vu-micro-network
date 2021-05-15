<template>
  <section>
    <div v-if="user.user">
      <label for="avatar" v-if="!loading">
        <Avatar
          class="avatar"
          :image="user.user.imageAvatar || require('../assets/avatar1.svg')"
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
      <div v-else>
        <ProgressSpinner
          style="width:30px;height:30px"
          strokeWidth="3"
          fill="none"
          animationDuration=".5s"
        />
      </div>
    </div>
    <!-- <div v-if="user" class="p-text-center">
      <div v-if="!loading">
        
      </div>
      
      <h2 v-if="user.user">{{ user.user.name }}</h2>
      <div class="p-buttonset p-mt-3">
        <Button
          v-if="!alreadyFriends"
          label="Add"
          icon="pi pi-check"
          @click="addFriend()"
        />
        <Button
          v-else
          label="Remove"
          icon="pi pi-times"
          class="p-button-danger"
          @click="removeFriend()"
        />
      </div>

      <Message v-if="error || $store.getters.error" severity="error">{{
        error || $store.getters.error
      }}</Message>

      <Friends :friends="user.user.friends" />
    </div>
    <div v-else>
      <ProgressSpinner
        style="width:30px;height:30px"
        strokeWidth="3"
        fill="none"
        animationDuration=".5s"
      />
    </div> -->
  </section>
</template>

<script>
import Friends from './Friends';
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  //eslint-disable-next-line
  components: { Friends },
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
    async addFriend() {
      await this.$store.dispatch('posts');
      await this.$store.dispatch('add_friend', {
        userId: this.login.user._id,
        friendId: this.user.user._id,
      });
    },
    removeFriend(user) {
      console.log(user);
    },
  },
  computed: {
    ...mapGetters(['user', 'login']),
    alreadyFriends() {
      return this.user.user.friends.some(
        (friend) => friend.friendId._id === this.login.user._id
      );
    },
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
