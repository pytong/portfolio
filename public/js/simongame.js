function SimonGame() {
  var sequence = [],
      userInput = [],
      notes = [
        new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
      ],
      victorySoundTrack = new Audio("http://soundbible.com/grab.php?id=1003&type=mp3"),
      hightlightDuration = 300,
      durationBetweenNote = 1000,
      currentNoteIndex;

  return {
    honk: function(note) {
      notes[note].play();
    },

    highlight: function(note) {
      setTimeout( function() { $(".note" + note).effect("highlight", hightlightDuration) }, hightlightDuration);
    },

    randomNote: function() {
      return Math.floor((Math.random() * notes.length) + 1) - 1;
    },

    addNote: function() {
      var note = this.randomNote();
      sequence.push(note);
      this.showNote(note)
      $(".count").text(sequence.length);
    },

    showNote: function(note) {
      this.highlight(note);
      this.honk(note);
    },

    playSequence: function(newNote) {
      var _this = this;
      userInput = [];
      _this.disablePadListeners();
      _this.disableRestartListener();

      currentNoteIndex = 0;
      setTimeout(function playNote() {
        if(currentNoteIndex < sequence.length) {
          _this.showNote(sequence[currentNoteIndex]);
          currentNoteIndex += 1;
          setTimeout(function() { playNote(); }, durationBetweenNote);
        } else {
          if(newNote === true) {
            _this.addNote();
          }
          _this.enableRestartListener();
          _this.enablePadListeners();
        }
      }, 1000);
    },

    exactMatch: function(notes1, notes2) {
      var note1Length = notes1.length;

      if(note1Length !== notes2.length) {
        return false;
      }

      for(var i = 0; i < note1Length; i++) {
        if(notes1[i] !== notes2[i]) {
          return false;
        }
      }

      return true;
    },

    partialMatch: function() {
      var userInputLength = userInput.length,
          sequenceLength = sequence.length;

      return (sequenceLength > 0) &&
             (userInputLength < sequenceLength) &&
             this.exactMatch(sequence.slice(0, userInputLength), userInput);
    },

    reset: function() {
      sequence = [];
      userInput = [];
    },

    restart: function() {
      this.reset();
      this.playSequence(true);
    },

    enableRestartListener: function() {
      var _this = this,
          restartBtn = $(".restart");

      restartBtn.click(function() {
        _this.disableRestartListener();
        _this.restart();
      });
      restartBtn.prop("disabled", false);
    },

    disableRestartListener: function() {
      $(".restart").prop("disabled", true);
      $(".restart").off("click");
    },

    enablePadListeners: function() {
      var padEl,
          note,
          _this = this;

      $(".note").click(function(event) {
        padEl = $(event.target),
        note = padEl.data("note");
        userInput.push(note);
        _this.showNote(note);

        if(_this.partialMatch()) {
          return;
        } else if(_this.exactMatch(sequence, userInput)) {
          if(sequence.length === 20) {
            setTimeout(function() { victorySoundTrack.play(); }, hightlightDuration * 2);
            $(".note").effect("pulsate", hightlightDuration * 5);
            setTimeout(function() { _this.restart(); }, hightlightDuration * 5);
          } else {
            setTimeout(function() { _this.playSequence(true); }, durationBetweenNote);
          }
        } else {
          _this.showError();
          if($(".strict input").prop("checked") === true) {
            setTimeout(function() { _this.restart(); }, hightlightDuration * 5);
          } else {
            setTimeout(function() {
              $(".count").text(sequence.length);
              _this.playSequence(false);
            }, durationBetweenNote);
          }
        }
      });
    },

    disablePadListeners: function() {
      $(".note").off("click");
    },

    showError: function(callback) {
      var countEl = $(".count");

      countEl.text("! !");
      countEl.effect("pulsate", hightlightDuration * 5);
      $(".note").effect("pulsate", hightlightDuration * 5);
    }

  }
}


var simonGame = SimonGame();
simonGame.playSequence(true);
