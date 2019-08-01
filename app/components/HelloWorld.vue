<template>
  <div>
    <h1>Tic Tac Toe</h1>
    <h2 v-if="gameOver">{{ gameOverMessage }}</h2>
    <h2 v-else>Player {{ pOneTurn ? '1' : '2' }}'s turn</h2>
    <ul>
      <li
        v-bind:key="box.key"
        v-on:click.prevent="onClick(box.key)"
        v-for="box in grid"
        v-bind:class="{ winningTile: gameOver && winningState.includes(box.key)}"
      >
        {{ box.content }}
      </li>
    </ul>
    <button
      v-bind:disabled="!gameOver"
      v-on:click="reset()"
    >
      RESET
    </button>
  </div>
</template>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  width: 456px;
  list-style: none;
  border: 2px solid black;
  padding: 2px;
  text-align: center;
}

li {
  height: 150px;
  width: 150px;
  border: 1px solid black;
  line-height: 200px;
  font-size: 150px;
}

.winningTile {
  background-color: green;
}
</style>

<script>
function getDefaultGrid() {
  return [
    { key: 0, content: "" },
    { key: 1, content: "" },
    { key: 2, content: "" },
    { key: 3, content: "" },
    { key: 4, content: "" },
    { key: 5, content: "" },
    { key: 6, content: "" },
    { key: 7, content: "" },
    { key: 8, content: "" },
  ];
}

export default {
  data (){
    return {
      grid: [],
      pOneTurn: true,
      winStates: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
      ],
      gameOver: false,
      gameOverMessage: "",
      winningState: null,
    }
  },
  created() {
    this.grid = getDefaultGrid();
  },
  methods: {
    handleGameState() {
      const gameState = this.checkGameState();
      if (gameState) {
        this.gameOver = true;
        const { message, state } = gameState;
        this.gameOverMessage = message;
        this.winningState = state;
      }
    },
    checkGameState() {
      for (let state of this.winStates) {
        const hasEmpty = !this.grid[state[0]].content && !this.grid[state[1]].content && !this.grid[state[2]].content;
        const isWin = (this.grid[state[0]].content === this.grid[state[1]].content) && (this.grid[state[1]].content === this.grid[state[2]].content);
        if (!hasEmpty && isWin) {
          return {
            message: this.grid[state[0]].content === 'O' ? 'Player 1 Wins!' : 'Player 2 Wins!',
            state
          };
          break;
        }
      }
      const boardCount = this.grid.filter(box => !!box.content).length; 
      if (boardCount >= 9)
        return {
          message: 'Cat\'s Game!',
          state: []
        };
      return null;
    },
    onClick(index) {
      if (this.gameOver || this.grid[index].content) return;
      this.grid[index].content = this.pOneTurn ? 'O' : 'X';
      this.pOneTurn = !this.pOneTurn;
      this.handleGameState();
    },
    reset() {
      this.grid = getDefaultGrid();
      this.gameOver = false;
      this.gameOverMessage = "";
      this.winningState = null;
      this.pOneTurn = true;
    }
  }
}
</script>

