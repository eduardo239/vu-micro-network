<template>
  <div>
    <form class="p-shadow-1 p-my-4 p-p-5 App-form" @submit.prevent="login">
      <h3>Login</h3>
      <div class="p-fluid">
        <div class="p-field">
          <label for="email">Email</label>
          <InputText
            v-model="email"
            id="email"
            type="email"
            placeholder="Email.."
          />
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <InputText
            v-model="password"
            id="password"
            type="password"
            placeholder="Password.."
          />
        </div>
      </div>
      <div class="p-field">
        <Button label="Login" type="submit" />
      </div>
      <router-link to="/register" class="link">Sing Up</router-link>
    </form>

    <Message v-if="error || $store.getters.error" severity="error">{{
      error || $store.getters.error
    }}</Message>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: 'admin@admin.com',
      password: '123123',

      error: null,
      response: null,
    };
  },
  methods: {
    async login() {
      this.error = '';
      await this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });
      await this.$store
        .dispatch('auto_login')
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
