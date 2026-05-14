# Udhar App 💸

Realtime Udhar / Khata Management App built using:
- React + Vite
- Node.js + Express
- MongoDB Atlas
- Socket.io
- Tailwind CSS
- JWT Authentication

---

## Features 🚀

### Authentication
- Signup / Login
- JWT based authentication
- Role based users
  - Shopkeeper
  - Customer

### Shopkeeper Features
- Search customers
- Send udhar requests
- Send payment update requests
- View customer ledgers
- Realtime updates
- Dark / Light mode

### Customer Features
- Receive pending requests
- Approve / Reject requests
- View total pending balance
- View approved transactions
- Realtime notifications

### Realtime Features ⚡
Using Socket.io:
- Instant request notifications
- Live ledger updates
- Live approval sync
- Live rejection sync

---

## Tech Stack 🛠

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Socket.io Client
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- Socket.io

---

## Project Structure 📂

```txt
udhar-app/
│
├── client/
│   ├── src/
│   ├── pages/
│   ├── services/
│   ├── socket/
│   └── components/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md
```

---

## Installation ⚙️

**1️⃣ Clone Repository**
```bash
git clone [https://github.com/YOUR_USERNAME/udhar-app.git](https://github.com/YOUR_USERNAME/udhar-app.git)
```

**2️⃣ Frontend Setup**
```bash
cd client
npm install
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

**3️⃣ Backend Setup**
```bash
cd server
npm install
npm run dev
```
*Backend runs on: `http://localhost:5000`*

---

## Environment Variables 🔐

### Backend `.env`
Create `server/.env` and add:
```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

### Frontend `.env`
Create `client/.env` and add:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## Deployment 🌍

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Render
- **Database:** MongoDB Atlas

### Frontend Deployment (Vercel)
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:**
  ```env
  VITE_API_URL=https://YOUR_BACKEND_URL/api
  VITE_SOCKET_URL=https://YOUR_BACKEND_URL
  
```

### Backend Deployment (Render)
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  ```env
  MONGO_URI=YOUR_MONGO_URI
  JWT_SECRET=YOUR_SECRET
  PORT=10000
  
```

---

## Socket Events ⚡

**Client Events**
- `registerUser`

**Server Events**
- `new_pending_request`
- `ledger_updated`
- `request_rejected`

---

## API Routes 📡

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET  /api/auth/search`

### Pending Requests
- `POST /api/pending-requests/create`
- `GET  /api/pending-requests/customer`
- `PUT  /api/pending-requests/approve/:id`
- `PUT  /api/pending-requests/reject/:id`

### Ledger
- `GET /api/ledger/shopkeeper`
- `GET /api/ledger/customer`

---

## Future Improvements 🚀
- WhatsApp reminders
- UPI integration
- PDF bill export
- Admin dashboard
- Analytics
- Mobile app
- Push notifications

---

## Author 👨‍💻
**Madhu Sailesh Sasamal**

## License 📄
This project is licensed under the MIT License.
