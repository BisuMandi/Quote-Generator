// Getting Elements
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const copyIcon = document.getElementById('copy-icon');
const modeBtn = document.getElementById('mode');

const mainQuote = document.getElementById('main-quote');
const loader = document.getElementById('loader');

// Show loading icon
function loading() {
  loader.hidden = false;
  mainQuote.hidden = true;
}

// Hide loading icon
function complete() {
  loader.hidden = true;
  mainQuote.hidden = false;
}

// Set Random Quote from local qutoes array
function setQuote() {
  loading();
  const quoteItem = quotes[Math.floor(Math.random() * quotes.length)];
  // Check if qoute length is above 75 chars and if so add 'long-qoute' class to it
  if (quoteItem.quote.length > 70) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote')
  }
  quoteText.textContent = `${quoteItem.quote}`;
  quoteAuthor.textContent = `- ${quoteItem.author}`;
  complete();
  // —
}

// Tweet Quote in Twitter
function tweetQuote() {
  const twitterUrl =
    `https://twitter.com/intent/tweet?text=${quoteText.textContent}${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
  // window.open('google.com', _blank);
}

async function setQuoteFromAPI() {
  try {
    loading();
    const resp = await fetch("https://api.codetabs.com/v1/proxy?quest=https://zenquotes.io/api/random");
    const data = await resp.json();
    // Randomly selecting one quote object from returned array
    const randomNum = Math.floor(Math.random() * data.length);
    const quoteItem = data[randomNum];

    // Check if API request exceeds by evaluating the text returned by API
    if ((quoteItem.a !== 'zenquotes.io') || (quoteItem.q !== 'Too many requests. Obtain an auth key for unlimited access.')) {
      if (quoteItem.q.length > 70) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote')
      }
      quoteText.textContent = `${quoteItem.q}`;
      quoteAuthor.textContent = `- ${quoteItem.a}`;
      console.log("Quote has been set from API");
      complete();
    } else {
      setQuote();
      console.log("Quote has been set from Local quotes due to too many requests")
    }
  } catch (err) {
    console.log("Error:", err);
    setQuote();
    console.log("Quote has been set from Local quotes");
  }
}

const checkbox = document.getElementById("checkbox")
// Restore the previous mode
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  checkbox.checked = true;
}

// Mode toggle button
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  // Remember/ save the current mode
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Event Listeners
// Set Random Quote once from local array (for fast experience) on page loading
window.addEventListener('load', setQuote);

// Set Random Quote when user clicks on New Quote button
newQuoteBtn.addEventListener('click', () => {
  if (navigator.onLine) {
    setQuoteFromAPI();
  } else {
    setQuote();
    console.log("Offline: Local quote loaded");
  }
});

// Redirect to Twitter Post page when user clicks on the Twitter Icon
twitterBtn.addEventListener('click', () => {
  if (navigator.onLine) tweetQuote();
  else window.alert("You're Offine");
});

// Copy the current quote and author in user's clipboard
copyIcon.addEventListener('click', () => {
  navigator.clipboard.writeText(`${quoteText.textContent} ${quoteAuthor.textContent}`)
    .then(() => {
      // add 'clicked' class to make icon black
      copyIcon.classList.remove('fa-regular');
      copyIcon.classList.add('fa-solid', 'clicked');
      // remove the black fill after 1 second
      setTimeout(() => {
        copyIcon.classList.remove('fa-solid', 'clicked');
        copyIcon.classList.add('fa-regular');
      }, 1000);
    })
    .catch(() => {
      console.log('Failed to copy', err);
    });
});