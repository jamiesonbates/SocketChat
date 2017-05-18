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
* Edit, delete messages.

## Technology Options
* React
* Redis
* Socket.io

### ERD (list form)

#### Users
* id integer
* first_name varchar(255)
* last_name varchar(255)
* username varchar(255)
* email varchar(255)
* password (special?)
* timestamps date

#### Friends
* id integer
* user_id1 integer
* user_id2 integer
* timestamps date

#### Chats_Users
* id integer
* user_id integer
* chat_id integer

#### Chats
* id integer
* name varchar(255)
* timestamps date

#### Messages
* id integer
* chat_id integer
* user_id integer
* timestamps date

#### Starred
* id integer
* user_id integer
* message_id integer
* timestamps date


  
