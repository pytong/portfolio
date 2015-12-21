function TicTacToeGame() {
  var humanMoves = [],
      computerMoves = [],
      computerSymbol,
      humanSymbol,
      lastHumanMove = -1;

  return {
    getWinningMovesCombinations: function() {
      return [
        [0, 4, 8],
        [2, 4, 6],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ]
    },

    getEmptySlots: function() {
      var emptySlots = [0, 1, 2, 3, 4, 5, 6, 7, 8],
          emptySlotIndex,
          humanMovesLength = humanMoves.length,
          computerMovesLength = computerMoves.length;

      for(var i = 0; i < humanMovesLength; i++) {
        emptySlotIndex = emptySlots.indexOf(humanMoves[i]);
        emptySlots.splice(emptySlotIndex, 1);
      }

      for(var i = 0; i < computerMovesLength; i++) {
        emptySlotIndex = emptySlots.indexOf(computerMoves[i]);
        emptySlots.splice(emptySlotIndex, 1);
      }

      return emptySlots;
    },

    addSlotListeners: function() {
      var _this = this;

      $(".slot").click(function(event) {
        var slotEl = $(event.target),
            slotClicked = slotEl.data("slot"),
            winningMoves;

        if(!_this.isOccupied(slotClicked)) {
          _this.makeHumanMove(slotClicked);
          _this.computerCalculateAndMove();

          winningMoves = _this.getWinningMoves(computerMoves);
          if(winningMoves.length > 0) {
            _this.showWinningMoves(winningMoves, function() { _this.resetGame(); } );
            _this.disableSlotListeners();
          } else if(_this.gameOver()) {
            setTimeout(function() { _this.resetGame(); }, 2000);
          }
        }
      })
    },

    addSymbolSelectorListeners: function() {
      var _this = this;

      $(".x-button").click(function() {
        humanSymbol = "X";
        computerSymbol = "O";
        _this.startGame();
      });

      $(".o-button").click(function() {
        humanSymbol = "O";
        computerSymbol = "X";
        _this.startGame();
      });
    },

    startGame: function(){
      // always start at center or corners to guarantee winning/tie
      var move = [0,2,4,6,8][Math.floor(Math.random() * 5)];
      computerMoves.push(move);
      $(".slot" + move).text(computerSymbol);
    },

    resetGame: function() {
      humanMoves = [];
      computerMoves = [];
      lastHumanMove = -1;

      for(var i = 0; i < 9; i++) {
        $(".slot" + i).text("");
      }

      this.addSlotListeners();
      this.startGame();
    },

    disableSlotListeners: function() {
      for(var i = 0; i < 9; i++) {
        $(".slot" + i).off("click");
      }
    },

    isOccupied: function(slot) {
      var emptySlots = this.getEmptySlots();
      return (emptySlots.indexOf(slot) < 0);
    },

    makeHumanMove: function(slot) {
      humanMoves.push(slot);
      $(".slot" + slot).text(humanSymbol);
      lastHumanMove = slot;
    },

    makeComputerMove: function(slot) {
      computerMoves.push(slot);
      $(".slot" + slot).text(computerSymbol);
    },

    getWinningMoveForComputer: function() {
      var winningMovesCombinations = this.getWinningMovesCombinations(),
          winningMovesCombinationsLength = winningMovesCombinations.length,
          winningMoves,
          missingMove;

      if(computerMoves.length < 2) {
        return null;
      }

      for(var i = 0; i < winningMovesCombinationsLength; i++) {
        winningMoves = winningMovesCombinations[i];
        missingMove = this.moveAwayFromWinning(winningMoves, computerMoves);
        if(typeof(missingMove) !== "undefined" && missingMove !== null) {
          return missingMove;
        }
      }

      return null;
    },

    getOpponentBlockingMoveForComputer: function() {
      var winningMovesCombinations = this.getWinningMovesCombinations(),
          winningMovesCombinationsLength = winningMovesCombinations.length,
          winningMoves;

      for(var i = 0; i < winningMovesCombinationsLength; i++) {
        winningMoves = winningMovesCombinations[i];

        if(humanMoves.indexOf(winningMoves[0]) >= 0 && humanMoves.indexOf(winningMoves[1]) >= 0 && humanMoves.indexOf(winningMoves[2]) < 0 && !this.isOccupied(winningMoves[2])) {
          return winningMoves[2];
        } else if(humanMoves.indexOf(winningMoves[2]) >= 0 && humanMoves.indexOf(winningMoves[0]) >= 0 && humanMoves.indexOf(winningMoves[1]) < 0 && !this.isOccupied(winningMoves[1])) {
          return winningMoves[1];
        } else if(humanMoves.indexOf(winningMoves[1]) >= 0 && humanMoves.indexOf(winningMoves[2]) >= 0 && humanMoves.indexOf(winningMoves[0]) < 0 && !this.isOccupied(winningMoves[0])) {
          return winningMoves[0];
        }
      }

      return null;
    },

    getPromisingMoveForComputer: function() {
      var winningMovesCombinations = this.getWinningMovesCombinations(),
          winningMovesCombinationsLength = winningMovesCombinations.length,
          winningMoves;

      for(var i = 0; i < winningMovesCombinationsLength; i++) {
        winningMoves = winningMovesCombinations[i];
        if(computerMoves.indexOf(winningMoves[0]) >= 0 && computerMoves.indexOf(winningMoves[1]) < 0 && computerMoves.indexOf(winningMoves[2]) < 0 && !this.isOccupied(winningMoves[1])) {
          return winningMoves[1];
        } else if(computerMoves.indexOf(winningMoves[2]) >= 0 && computerMoves.indexOf(winningMoves[0]) < 0 && computerMoves.indexOf(winningMoves[1]) < 0 && !this.isOccupied(winningMoves[0])) {
          return winningMoves[0];
        } else if(computerMoves.indexOf(winningMoves[1]) >= 0 && computerMoves.indexOf(winningMoves[2]) < 0 && computerMoves.indexOf(winningMoves[0]) < 0 && !this.isOccupied(winningMoves[2])) {
          return winningMoves[2];
        }
      }

      return null;
    },

    computerCalculateAndMove: function() {
      var nextMove,
          emptySlots;

      nextMove = this.getWinningMoveForComputer();
      if(nextMove !== null) {
        this.makeComputerMove(nextMove);
        return;
      }

      nextMove = this.getOpponentBlockingMoveForComputer();
      if(nextMove !== null) {
        this.makeComputerMove(nextMove);
        return;
      }

      nextMove = this.getPromisingMoveForComputer();
      if(nextMove !== null) {
        this.makeComputerMove(nextMove);
        return;
      }

      emptySlots = this.getEmptySlots();
      if(emptySlots.length === 1) {
        this.makeComputerMove(emptySlots[0]);
      }
    },

    moveAwayFromWinning: function(winningMoves, moves) {
      var oneMoveAwayFromWinning = (
        (moves.indexOf(winningMoves[0]) >= 0 && moves.indexOf(winningMoves[1]) >= 0 && moves.indexOf(winningMoves[2]) < 0) ||
        (moves.indexOf(winningMoves[1]) >= 0 && moves.indexOf(winningMoves[2]) >= 0 && moves.indexOf(winningMoves[0]) < 0) ||
        (moves.indexOf(winningMoves[0]) >= 0 && moves.indexOf(winningMoves[2]) >= 0 && moves.indexOf(winningMoves[1]) < 0)
      ),
          _this = this;

      return winningMoves.find(function(winningMove) {
          return moves.indexOf(winningMove) < 0 &&
            !_this.isOccupied(winningMove) &&
            oneMoveAwayFromWinning;
        });
    },

    getWinningMoves: function(moves) {
      var winningMovesCombinations = this.getWinningMovesCombinations(),
          winningMovesCombinationsLength = winningMovesCombinations.length;

      if(moves.length < 3) {
        return false;
      }

      for(var i = 0; i < winningMovesCombinationsLength; i++) {
        if(moves.indexOf(winningMovesCombinations[i][0]) >= 0 &&
           moves.indexOf(winningMovesCombinations[i][1]) >= 0 &&
           moves.indexOf(winningMovesCombinations[i][2]) >= 0) {
          return winningMovesCombinations[i];
        }
      }

      return [];
    },

    gameOver: function() {
      return ((humanMoves.length + computerMoves.length) === 9);
    },

    showWinningMoves: function(moves, callback) {
      var movesLength = moves.length
      for(var i = 0; i < movesLength; i++) {
        $(".slot" + moves[i]).effect("pulsate", {}, 2000, callback);
      }
    }


  }
}



$(function() {
  $("#symbol-selector").modal();
});

var ticTacToeGame = TicTacToeGame();
ticTacToeGame.addSlotListeners();
ticTacToeGame.addSymbolSelectorListeners();
