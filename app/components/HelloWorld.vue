<template>
  <div id="app">
    <form v-on:submit.prevent="onSubmit">
      <label>{{ name }}</label>
      <input v-model="message" placeholder="">
      <p>{{ message }}</p>
      <button>Send</button>
    </form>
    <button v-on:click="handleRefresh">Refresh</button>
    <ul id="messages">
      <li v-bind:key="item.id" v-for="item in messages">
        <div>{{ item.author }}</div>
        {{ item.content }}
        <small>{{ utcMinutesFromNow(item.updated_at) }} minutes ago</small>
      </li>
    </ul>
  </div>
</template>

<style scoped>
label {
  display: block;
}

small {
  color: gray;
}
</style>

<script>

export default {
  data (){
    return {
      name: 'Edmond',
      message: '',
      messages: []
    }
  },
  // computed: {
  //   utcMinutesFromNow(time) {
  //     return Math.round((Date.now() - new Date(time)) / 60000)
  //   }
  // },
  methods: {
    utcMinutesFromNow(time) {
      return Math.round((Date.now() - new Date(time)) / 60000)
    },
    onSubmit(e) {
      fetch('https://wagon-chat.herokuapp.com/279/messages', {
        method: 'POST', 
        body: JSON.stringify({
          author: this.name,
          content: this.message
        })
      })
      .then(response => response.json())
      .then(data => {
        this.messages.push(data);
      })
    },
    handleRefresh(e) {
      fetch('https://wagon-chat.herokuapp.com/279/messages')
      .then(response => response.json())
      .then(data => {
        this.messages = data.messages;
      })
    }
  }
}
</script>

