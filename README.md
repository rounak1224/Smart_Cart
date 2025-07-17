# 🛒 Smart Trolley Web App

The **Smart Trolley Web App** is a modern shopping cart system built with React and Flask that enables seamless inventory tracking and a smooth checkout experience. Designed to work with a smart cart embedded system, this app allows users to view their cart, checkout securely, and generate a QR-based bill.

---

## 📸 Screenshots

![Login Page](./screenshots/login.png)
![Cart Dashboard](./screenshots/dashboard.png)
*Add screenshots in a `/screenshots` folder*

---

## 🚀 Features

- 🔐 **User & Staff Login**
- 📦 **View Cart Items**
- ✅ **Checkout with QR Code**
- 🧾 **QR Code links to Itemized Bill**
- ☁️ **AWS API Integration** for fetching and submitting data
- 🧑‍💻 **Staff Mode** – Coming soon!

---

## 🧱 Tech Stack

| Frontend  | Backend     | APIs (AWS Lambda) | Misc             |
|-----------|-------------|-------------------|------------------|
| React 18  | Flask (Python) | GET Cart, POST Checkout | QR Code (qrcode.react) |

---

## 🔗 APIs Used

| Action       | Endpoint                                                                 |
|--------------|--------------------------------------------------------------------------|
| Get Cart     | `https://5ak85sx806.execute-api.ap-south-1.amazonaws.com/prod/getproduct?user_id=user123` |
| Checkout     | `https://ufki6yxl7d.execute-api.ap-south-1.amazonaws.com/prod/checkout?user_id=user123` |

---

## 🛠️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/rounak1224/Smart_Cart.git
cd Smart_Cart

# 2. Install dependencies
npm install

# 3. Start the frontend
npm start
```

> Make sure your Flask backend is running separately if you're using local API endpoints.

---

## 📦 Folder Structure

```
smart-trolley-web/
├── public/
├── src/
│   ├── App.js
│   ├── Dashboard.js
│   ├── Login.js
│   ├── api_temp.js
│   └── ...
├── package.json
└── README.md
```

---

## 📄 How Checkout Works

1. User clicks **Checkout** on the dashboard.
2. App calls the **checkout API**.
3. API responds with cart summary.
4. App generates a **QR code** with bill URL.
5. User scans QR to view the **itemized bill**.

---

## 🔐 Login Credentials (for testing)

- **User:** `user123`
- **Staff:** Coming Soon...

---

## ✨ Upcoming Features

- Staff inventory view and control
- Smart cart RFID integration
- Payment gateway integration
- Live stock updates

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact

**Developer:** [Rounak Jain](https://github.com/rounak1224)  
📧 Email: *your-email@example.com* (add if needed)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).