const getQuote = async () => {
  const res = await fetch('https://api.quotable.io/random?tags=technology&minLength=100&maxLength=180');
  const data = await res.json();

  return data;
};

const displayQuote = async () => {
  const quoteElement = document.querySelector('.quote-section .quote') as HTMLParagraphElement;
  const quoteAuthorElement = document.querySelector('.quote-section .author') as HTMLParagraphElement;

  const data = await getQuote();

  quoteElement.innerText = data.content;
  quoteAuthorElement.innerText = data.author;
};

const quote = () => {
  displayQuote();

  const refreshQuoteBtn = document.querySelector('.refresh-quote-btn') as HTMLDivElement;

  refreshQuoteBtn.addEventListener('click', displayQuote);
};

export default quote;
