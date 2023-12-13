<template>
  <div class="register-container">
    <h2>Sign up</h2>
    <form class="register-form" @submit.prevent="register">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Sign up</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      try {
        // Register the user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          this.$firebaseService.auth,
          this.email,
          this.password
        )

        // User successfully registered
        const user = userCredential.user
        console.log('User registered:', user)

        // Redirect to the home page or another route
        this.$router.push('/home')
      } catch (error) {
        console.error('Registration error:', error.message)
        // Handle registration error (show an error message, etc.)
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
.register-form {
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
  .btn-container {
    display: flex;
    justify-content: space-between;
  }
  button {
    background-color: rgb(108, 207, 253);
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
</style>
