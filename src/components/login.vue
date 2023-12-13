<template>
    <div class="login-container">
      <h2>Login</h2>
      <form class="login-form" @submit.prevent="login">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
  
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <div class="btn-container">
        <button type="submit">Login</button>
        <button class="btn-registration"><router-link to="/register">Sign up</router-link></button>
      </div>
      </form>
       
    </div>
    
  </template>
  
  <script>
  import { ref } from 'vue';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          await signInWithEmailAndPassword(this.$firebaseService.auth, this.email, this.password);
          this.$router.push('/home');
        } catch (error) {
          console.error('Login error:', error.message);
          // Handle login error (show an error message, etc.)
        }
      }
    }
  };
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
  .btn-container {
    display: flex;
    justify-content: space-between;
  }
  button {
    background-color: #3498db;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  .btn-registration {
    background-color: rgb(108, 207, 253);
  }
  a {
    color: #fff;
  }
  </style>
  