import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

const app = new Vue({
  el: '#app',
  render: function(h) {
    return <HelloWorld/>
  }
});