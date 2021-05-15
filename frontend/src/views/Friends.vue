<template>
  <section class="p-mt-3">
    <div style="width: 100%" v-for="friend in friends" :key="friend._id">
      <div class="flex-h-space p-mb-1 App-table ">
        <div class="flex-v-center App-table-user ">
          <Avatar
            class="avatar"
            :image="
              friend.friendId.imageAvatar || require('../assets/avatar1.svg')
            "
            shape="circle"
          />
          <small>
            <router-link :to="`./profile/${friend.friendId._id}`">
              {{ friend.friendId.name }}
            </router-link>
          </small>
        </div>
        <div class="flex-v-center p-p-1">
          <Button icon="pi pi-send" class="p-mr-1" /><Button
            icon="pi pi-times"
            class="p-button-danger"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Friends',
  props: ['friends'],
};
</script>

<style></style>
