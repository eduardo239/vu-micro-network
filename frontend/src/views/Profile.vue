<template>
  <section>
    <div v-if="user.user">
      <label for="avatar" v-if="!loading" style="text-align: center;">
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
      <h3 v-if="user">{{ user.user.name }}</h3>
    </div>
    <div class="p-buttonset p-mt-3" v-if="user?.user?._id !== login?.user?._id">
      <Button label="Add" icon="pi pi-check" @click="addFriend()" />
      <Button
        label="Remove"
        icon="pi pi-times"
        class="p-button-danger"
        @click="removeFriend()"
      />
    </div>
    <Message v-if="error || $store.getters.error" severity="error">{{
      error || $store.getters.error
    }}</Message>

    <DataTable :value="list" responsiveLayout="scroll">
      <Column field="friendsId" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="imageAvatar" header="Avatar"></Column>
    </DataTable>

    <Button
      label="Load Friends"
      icon="pi pi-heart"
      class="p-button-danger"
      @click="rawFriends"
    />
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
      list: [],
    };
  },
  async created() {
    await this.$store.dispatch('get_user', this.$route.params.id);
  },
  async mounted() {
    if (this.$store.getters.user.user) this.rawFriends();
  },
  methods: {
    rawFriends() {
      let obj = {};
      let arr = [];

      this.$store.getters.user.user.friends.map((f) => {
        obj = {};
        obj.friendsId = f._id;
        obj.name = f.friendId.name;
        obj.imageAvatar = f.friendId.imageAvatar;
        arr.push(obj);
      });
      this.list = arr;
    },
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
      // await this.$store.dispatch('posts');
      await this.$store.dispatch('add_friend', {
        userId: this.login.user._id,
        friendId: this.user.user._id,
      });
      await this.$store.dispatch('get_user', this.$route.params.id);
    },
    async removeFriend() {
      await this.$store.dispatch('remove_friend', {
        userId: this.login.user._id,
        friendId: this.user.user._id,
      });
      await this.$store.dispatch('get_user', this.$route.params.id);
    },
  },
  computed: {
    ...mapGetters(['user', 'login']),
    alreadyFriends() {
      if (this.user?.user?.friends > 0) {
        return this.user.user.friends.some(
          (friend) => friend.friendId._id === this.login.user._id
        );
      } else {
        return [];
      }
    },
  },
  unmounted() {
    this.$store.dispatch('reset_user');
    this.list = [];
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
