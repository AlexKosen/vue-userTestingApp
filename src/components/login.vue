<template>
  <div class="login-container">
    <h2>Login</h2>
    <form class="login-form" @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <p v-if="error" class="error">Email or password is not correct!</p>
      <div class="btn-container">
        <button class="submit" type="submit">Login</button>
        <button class="btn-registration"><router-link to="/register">Sign up</router-link></button>
      </div>
    </form>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(this.$firebaseService.auth, this.email, this.password)
        this.$router.push('/home')
      } catch (error) {
        console.error('Login error:', error.message)
        this.error = true
      }
    }
  },
  watch: {
    email(newVal) {
      if (newVal) {
        this.error = false
      }
    },
    password(newVal) {
      if (newVal) {
        this.error = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  width: 100%;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 93%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.error {
  color: red;
}
.btn-container {
  display: flex;
  justify-content: space-between;
}
button {
  background-color: #3477db;
  color: #fff;
  padding: 10px 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #54b6fc;
}
.btn-registration {
  background-color: rgb(92, 202, 253);
  padding: 10px 15px;
}
.btn-registration:hover {
  background-color: rgb(169, 224, 252);
}
a {
  color: #fff;
}
</style>
