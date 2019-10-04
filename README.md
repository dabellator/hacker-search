# Hacker News simple clone

The purpose of this exercise is to demonstrate using the HN api built on top of Algolia's search functionality. This app currently demonstrates two functions:
  1. A debounced search bar that generates results on keystroke
  1. A infinite scroll list that fetches new results as the user reaches the bottom of the list

Improvements that can still be made:
  1. An improved infinite scroll that allows the user to 'find' a result much farther down on the page than just the next set, while also preventing unnecessary calls in between
  1. Improved content handling that confirms the data type and has more view options (author, comments, etc)
  1. Styling

To launch the app, pull down the repo and run:
`yarn && yarn start`
or
`npm install && npm start`
