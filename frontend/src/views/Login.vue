<template>
  <div class="p-grid">
    <div class="p-col-6 p-offset-3">
      <form class="p-shadow-1 p-my-5 p-p-5" @submit.prevent="login">
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

      <Message v-if="error" severity="error">{{ error }}</Message>
    </div>
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
    login() {
      this.error = '';
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
