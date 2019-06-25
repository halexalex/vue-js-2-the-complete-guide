new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    playerMana: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.playerMana = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.writeLog(true, false, false, damage);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
      this.manaRegen();
    },
    specialAttack: function() {
      if (this.playerMana <= 19) {
        alert('You are out of mana!');
      } else {
        this.playerMana -= 20;
        var damage = this.calculateDamage(10, 20);
        this.monsterHealth -= damage;
        this.writeLog(true, false, true, damage);
        
        if (this.checkWin()) {
          return;
        }
        this.monsterAttack();
      }
    },
    heal: function() {
      if (this.playerMana <= 19) {
        alert('You are out of mana!');
      }
      if (this.playerHealth <=90) {
        this.playerMana -= 20;
        this.playerHealth += 10;
      } else {
        this.playerMana -= 20;
        this.playerHealth = 100;
      }
      this.writeLog(true, true);
      this.monsterAttack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttack: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.writeLog(false, false, false, damage);
      this.checkWin();
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      var question = 'Do you want to engage in a new fight?';
      if (this.monsterHealth <= 0) {
        if (confirm('VICTORY ACHIEVED\n' + question)) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('YOU DIED\n'+ question)) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    writeLog: function(isPlayer, isHeal, isSpecial, damage) {
      var text;
      if (isHeal) {
        text = 'Player heals for 10 hp!';
      } else if (isSpecial) {
        text = 'Player hits Monster with a huge fireball for ' + damage + ' damage!';
      } else {
        text = (isPlayer ? 'Player hits Monster for ' : 'Monster hits Player for ') + damage + ' damage!';
      }
      this.turns.unshift({
        isPlayer: isPlayer,
        text: text 
      });
    },
    manaRegen: function() {
      if (this.playerMana <=90) {
        this.playerMana += 10;
      } else {
        this.playerMana = 100;
      }
    }
  }
});