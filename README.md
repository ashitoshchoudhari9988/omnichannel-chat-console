# Omnichannel AI Chat Console

A simplified **Omnichannel Customer Communication Platform** built with **Angular 19**, allowing customer support agents to manage conversations from multiple communication channels within a single interface.

---

# 🚀 Tech Stack

- Angular 19
- TypeScript
- Angular Signals
- RxJS
- IndexedDB (Dexie)
- DummyJSON API
- Web Speech API
- HTML5
- CSS3

---

# 📌 Features

## ✅ Omnichannel Chat Dashboard

- Conversation List
- Chat Window
- Customer Details Panel
- Multiple Channels
  - WhatsApp
  - Instagram
  - Facebook
  - Website Live Chat
  - Email

---

## ✅ Conversation Features

- Search Conversations
- Switch Between Conversations
- Message Timestamps
- Typing Indicator
- Auto Scroll
- Draft Message Auto Save
- Pinned Conversations
- Unread Message Count

---

## ✅ AI Chat Integration

Integrated with DummyJSON APIs.

API Used:

- https://dummyjson.com/users
- https://dummyjson.com/comments

Features:

- Send Message
- Receive AI Response
- AI Streaming Response (Character by Character)
- Auto Scroll During Streaming

---

## ✅ Voice Features

### Voice to Text

- Start Recording
- Stop Recording
- Live Speech Recognition
- Automatically Convert Speech to Text

### Text to Speech

- Play AI Response
- Pause Speech
- Resume Speech
- Stop Speech

---

## ✅ Offline Storage

Implemented using **IndexedDB (Dexie)**.

Stored Data

- Conversations
- Messages
- Draft Messages
- Pinned Chats
- Unread Counts

Data is automatically restored after page refresh.

---

## ✅ Responsive Design

Supports

- Desktop
- Tablet
- Mobile

---

# 📂 Project Structure

```
src
│
├── app
│
├── core
│   ├── services
│   ├── storage
│   ├── guards
│   └── interceptors
│
├── features
│   └── chat
│       ├── components
│       ├── models
│       ├── pages
│       ├── services
│       └── state
│
└── shared
```

---

# 🏗 Architecture

The application follows a scalable feature-based architecture.

- Core Module
- Feature Module
- Shared Module
- Signal-based State Management
- Service Layer
- Reusable Components

---

# 📦 Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run the application

```bash
ng serve
```

Navigate to

```
http://localhost:4200
```

---

# 🧠 Architectural Decisions

### Angular Signals

Used for application state management because:

- Lightweight
- High Performance
- Less Boilerplate
- Automatic UI Updates

---

### IndexedDB

Used instead of LocalStorage because:

- Better Performance
- Large Storage Capacity
- Structured Data Storage
- Persistent Offline Support

---

### RxJS

Used for:

- HTTP Requests
- Streaming Responses
- Reactive Programming

---

# 🌐 APIs

DummyJSON APIs

Users

```
https://dummyjson.com/users
```

Comments

```
https://dummyjson.com/comments
```

---

# ⚡ Performance Optimizations

- Angular Signals
- Component Reusability
- Auto Scroll
- Streaming Rendering
- Offline Storage
- Lazy State Updates

---

# 📋 Assumptions

- DummyJSON APIs are used as mock backend.
- AI responses are simulated using Comments API.
- No authentication is implemented.
- Messages are stored locally.

---

# ⚠ Known Limitations

- No real backend.
- No WebSocket implementation.
- AI responses are simulated.
- No user authentication.

---

# 🚀 Future Improvements

- WebSocket Integration
- Real AI APIs (OpenAI)
- Dark Mode
- Infinite Scrolling
- Virtual Scrolling
- Keyboard Shortcuts
- Unit Testing
- End-to-End Testing
- File Attachments
- Emoji Picker
- Push Notifications

---

# 👨‍💻 Author

Ashutosh

Frontend Developer

Angular | TypeScript | RxJS | Signals