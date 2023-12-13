<template>
    <div>
      <h2>Available Tests</h2>
      <ul>
        <li v-for="test in availableTests" :key="test.id">
          {{ test.name }}
          <button @click="startTest(test.id)" :disabled="isTestCompleted(test.id)">Start Test</button>
        </li>
      </ul>
  
      <h2>Completed Tests</h2>
      <ul>
        <li v-for="test in completedTests" :key="test.id">
          {{ test.name }} - Score: {{ test.score }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userId: null,
        availableTests: [
          { id: 1, name: 'Test 1' },
          { id: 2, name: 'Test 2' },
          { id: 3, name: 'Test 3' },
          { id: 4, name: 'Test 4' },
          { id: 5, name: 'Test 5' },
        ],
        completedTests: []
      };
    },
    methods: {
      async startTest(testId) {
        const score = Math.floor(Math.random() * 100) + 1;
        this.completedTests.push({ id: testId, name: `Test ${testId}`, score });
        await this.$firebaseService.updateCompletedTests(this.userId, this.completedTests);
      },
      isTestCompleted(testId) {
        return this.completedTests.some(test => test.id === testId);
      }
    },
    async created() {
      this.userId = (await this.$firebaseService.getCurrentUser())?.uid;
  
      if (this.userId) {
        const completedTests = await this.$firebaseService.getCompletedTests(this.userId);
        if (completedTests) {
          this.completedTests = Object.values(completedTests);
        }
      }
    }
  };
  </script>

<style>
</style>
  