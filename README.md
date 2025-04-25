# Quote Generator

A simple and responsive Quote Generator web application built with JavaScript. It displays random inspirational quotes along with their authors. Users can view a new quote, copy the quote to clipboard, or share it on Twitter. The app uses a quote API and also includes a fallback mechanism with a local array of quotes to ensure functionality even when offline.

## Live Demo

👉 [Click here to try the Quote Generator](https://bisumandi.github.io/Quote-Generator/)

## Features

- **Random Quote Display**: Shows a quote and its author.
- **New Quote**: Click to load a new random quote.
- **Tweet Quote**: Share the quote on Twitter with one click.
- **Copy Quote**: Copy the quote text to the clipboard.
- **Offline Support**: If the quote API fails or the user is offline, a local array of quote objects is used.

## Technologies Used

- HTML
- CSS
- JavaScript
- [ZenQuotes API](https://zenquotes.io/api/random)
- Twitter Web Intent

## How It Works

1. On page load, the app tries to fetch a quote from an external API.
2. If the API call is successful, the quote and author are displayed.
3. If the API fails or the user is offline, the app falls back to a predefined local array of quotes.
4. The user can:
   - Click a button to get a new quote.
   - Copy the quote to clipboard.
   - Share the quote directly to Twitter via a pre-filled tweet.

## Getting Started

To run this project locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/BisuMandi/Quote-Generator.git