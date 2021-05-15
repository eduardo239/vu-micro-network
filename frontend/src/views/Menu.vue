<template>
  <div>
    <Menubar :model="items" class="p-mb-2 p-mt-2" />
  </div>
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
          to: { name: 'home' },
        },
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          visible: () => this.$store.getters.isLoggedIn,
          // command: () => this.userProfile(),
        },
        {
          label: 'Login',
          icon: 'pi pi-fw pi-key',
          to: { name: 'login' },
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
          label: 'About',
          icon: 'pi pi-fw pi-times',
          to: 'about',
        },
        // {
        //   label: 'Theme',
        //   icon: 'pi pi-fw pi-sun',
        // },
      ],
    };
  },
  created() {},
  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch((err) => console.log(err));
    },
    userProfile() {
      this.$router.push(`/profile/${this.$store.getters.login.user._id}`);
    },
  },
};
</script>

<style></style>
