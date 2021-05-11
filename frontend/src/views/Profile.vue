<template>
  <div>
    <p>User {{ $store.getters.user.user }}</p>
    <br />
    <p>Route {{ this.$route.params || 'null' }}</p>
    <br />
  </div>
</template>

<script>
export default {
  name: 'Profile',
  mounted() {
    // console.log(this.$route.params || 'null');
  },
  computed: {
    userId() {
      return this.$route.params.userId; // TODO
    },
  },
};
</script>

<style></style>
