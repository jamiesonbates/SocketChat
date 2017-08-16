# Socket Chat
A fully-featured chatting app that harnesses the power of real-time data through the use of web sockets. Users have the ability to chat one-on-one or in groups, bookmark notable messages, and view other users' profiles.

## Personal Goals
* Work with sockets and explore real-time data.
* Handle building a web app with complex, changing state, using React and Redux.
* Build a detailed, well featured web app.

## Notable "Wins"
* Custom-built middleware for Redux to handle socket actions and events.
* Utilized higher order components.

## Largest Challenges
* State manager architecture 
  - Managing shared state.
  - Updating same state in multiple components was challenging.
  - Future: would like to model my data and components more deeply before building.
* Building a complex front end with many views
  - Rendering appropriate view when there are many options.
  - Handling components who use/manage same state (sometimes updating both at once).
  - Future: break down components into smaller pieces and utilize higher order components more to handle rendering logic.
* Handling socket actions and events in normal flow of Redux state management.
  - Socket event listening and emitting could not occur within components.
  - Having sockets update state used by multiple components simultaneously.
  - Build custom-built middleware for Redux to solve this problem .

## Technologies
* React
* Redux
* Socket.io
* Node
* Express
* JWT
* Bcrypt
* Knex
* Postgresql
* Heroku
* Cloudinary
* Webpack

## Workflow
Check out much of my workflow on [Trello](https://trello.com/b/QtbJNewC/socket-chat).
