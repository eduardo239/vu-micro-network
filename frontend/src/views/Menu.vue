<template>
  <Menubar :model="items" />
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          to: '/',
        },
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          to: `/profile/`,
          visible: () => this.$store.getters.isLoggedIn,
        },
        {
          label: 'Login',
          icon: 'pi pi-fw pi-key',
          to: '/login',
          visible: () => !this.$store.getters.isLoggedIn,
        },
        {
          label: 'Register',
          icon: 'pi pi-fw pi-file',
          to: '/register',
          visible: () => !this.$store.getters.isLoggedIn,
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          command: () => this.logout(),
          visible: () => this.$store.getters.isLoggedIn,
        },
        {
          label: 'Theme',
          icon: 'pi pi-fw pi-sun',
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
