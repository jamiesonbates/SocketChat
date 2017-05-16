# SocketChat

## About
A prototypical chat/messenger app using sockets. I want to build this so I can get experience using sockets.

## Primary Use Case
A person with many friends needs an application that enables them to chat with individuals and groups with as few barriers as possible.

## Potential Features
* Real-time info - users will be able to see if someone is typing and who it is.
* Group chat - you can create chats with multiple other users.
* Chat history.
* Star messages.
* Search chat histories.

#### Stretch
* Admin page.
* Different type of auth than cookies.
* Store short histories locally.
* Store messages to send when online.

## Technology Options
* React
* Redis
* Socket.io

### ERD (list form)

#### Users
* id
* first_name
* last_name
* username
* email
* password
* timestamps

#### Friends
* id
* user_id1
* user_id2
* timestamps

#### Chats
* id
* user_id's
* name
* timestamps

#### Messages
* id
* chat_id
* user_id
* timestamps

#### Starred
* id
* user_id
* message_id
* timestamps


  
