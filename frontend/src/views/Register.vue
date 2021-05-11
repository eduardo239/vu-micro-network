<template>
  <div class="p-grid">
    <div class="p-col-6 p-offset-3">
      <form class="p-shadow-1 p-my-5 p-p-5" @submit.prevent="register">
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
      <Message v-if="error" severity="error">{{ error }}</Message>
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
    register() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      this.$store
        .dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
