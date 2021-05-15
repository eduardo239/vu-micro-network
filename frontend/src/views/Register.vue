<template>
  <div>
    <div>
      <form class="p-shadow-1 p-my-4 p-p-5 App-form" @submit.prevent="register">
        <h3>Register</h3>
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
            <label for="name">Name</label>
            <InputText
              v-model="name"
              id="name"
              type="text"
              placeholder="Name.."
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
          <div class="p-field ">
            <label for="passwordAgain">Password Again</label>
            <InputText
              v-model="password_confirmation"
              id="passwordAgain"
              type="password"
              placeholder="Password Again.."
            />
          </div>
        </div>
        <div class="p-field ">
          <Button label="Register" type="submit" />
        </div>
        <router-link to="/login" class="link">Sing In</router-link>
      </form>
      <Message v-if="error || $store.getters.error" severity="error">{{
        error || $store.getters.error
      }}</Message>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: 'user@admin.com',
      name: 'User',
      password: '123123',
      password_confirmation: '123123',
      error: null,
    };
  },
  methods: {
    async register() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      if (this.password !== this.password_confirmation) {
        this.error = 'Passwords must match.';
        return;
      }

      await this.$store
        .dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));

      await this.$store.dispatch('auto_login');
    },
  },
};
</script>

<style></style>
