<template>
  <div class="register-container">
    <h2>Sign up</h2>
    <form class="register-form" @submit.prevent="register">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <p class="error" v-if="error">{{ error }}</p>

      <button class="submit" type="submit">Sign up</button>
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
      password: '',
      error: null
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
        if (error.message === 'Firebase: Error (auth/invalid-email).') {
          this.error = 'This email is not correct'
        } else if (
          error.message ===
          'Firebase: Password should be at least 6 characters (auth/weak-password).'
        ) {
          this.error = 'Password should be at least 6 characters'
        } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          this.error = 'Email already in use'
        } else {
          this.error = error.message.split(':')[1]
        }
      }
    }
  },
  watch: {
    email(newVal) {
      if (newVal) {
        this.error = null
      }
    },
    password(newVal) {
      if (newVal) {
        this.error = null
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
.error {
  color: red;
}
.btn-container {
  display: flex;
  justify-content: space-between;
}
.submit {
  background-color: rgb(159, 86, 255);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.submit:hover {
  background-color: rgb(196, 154, 250);
}
</style>
