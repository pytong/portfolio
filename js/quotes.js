function QuoteGenerator() {
  var lastIndex = -1,
      quotes = [
        ['The unexamined life is not worth living.', 'Socrates'],
        ['The flower that blooms in adversity is the rarest and most beautiful of all.', 'Walt Disney Company'],
        ['What\'s meant to be will always find a way', 'Trisha Yearwood'],
        ['Sometimes you wake up. Sometimes the fall kills you. And sometimes, when you fall, you fly.', 'Neil Gaiman, The Sandman'],
        ['Do one thing every day that scares you.', 'Eleanor Roosevelt'],
        ['We are what we pretend to be, so we must be careful about what we pretend to be.', 'Kurt Vonnegut'],
        ['In the middle of every difficulty lies opportunity.', 'Albert Einstein'],
        ['A word of encouragement during a failure is worth more than an hour of praise after success.', 'unknown'],
        ['Everyone has inside them a piece of good news. The good news is you don’t know how great you can be! How much you can love! What you can accomplish! And what your potential is.', 'Anne Frank'],
        ['The best revenge is massive success.', 'Frank Sinatra'],
        ['It is time for us all to stand and cheer for the doer, the achiever – the one who recognizes the challenges and does something about it.', 'Vince Lombardi'],
        ['Press on – nothing can take the place of persistence. Talent will not; nothing is more common than unsuccessful men with talent. Genius will not; unrewarded genius is almost a proverb. Education will not; the world is full of educated derelicts. Perseverance and determination alone are omnipotent.', 'Calvin Coolidge'],
        ['Often we women are risk averse. I needed the push. Now, more than ever, young women need more seasoned women to provide that encouragement, to take a risk, to go for it. Once a glass ceiling is broken, it stays broken.', 'Jennifer Grahnolm'],
        ['This too shall pass.', 'Persian Sufi Poets'],
        ['I decided, very early on, just to accept life unconditionally; I never expected it to do anything special for me, yet I seemed to accomplish far more than I had ever hoped. Most of the time it just happened to me without my ever seeking it.','Audrey Hepburn'],
        ['Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.', 'Hellen Keller'],
        ['Talent is cheaper than table salt. What separates the talented individual from the successful one is a lot of hard work.','Stephen King'],
        ['Big jobs usually go to the men who prove their ability to outgrow small ones.', 'Ralph Emerson']
      ];

  return {
    generateAndShowQuote: function() {
      var quotesLength = quotes.length,
          index = Math.floor(Math.random() * quotesLength),
          item,
          quote,
          author;

      while(index === lastIndex) {
        index = Math.floor(Math.random() * quotesLength);
      }
      lastIndex = index;

      item = quotes[index];
      quote = item[0];
      author = item[1];
      $('.quote-text').html(quote);
      $('.quote-author').html(author);
    },

    addNewQuoteListener: function() {
      var _this = this;
      $(".new-quote").click(function() {
        _this.generateAndShowQuote();
      });
    }

  }
}

var quoteGenerator = QuoteGenerator();
quoteGenerator.addNewQuoteListener();

$.ready(quoteGenerator.generateAndShowQuote());
