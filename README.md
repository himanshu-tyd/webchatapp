![alt text](https://github.com/himanshu-tyd/WebChatApp/blob/main/frontend/public/homepage.png)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
# **Inroduction**

**WebChatApp** is a full-stack, real-time messaging application designed for seamless communication. It offers features such as real-time messaging, online status indicators, user authentication, and a modern user interface with a glassmorphism effect.

## **🌟 Features**

- **Real-Time Messaging**: Instantly send and receive messages with live updates.
- **User Authentication**: Secure sign-up and login using JWT.
- **Online Status Indicators**: Know who's online with real-time status updates.
- **User-Friendly Interface**: Beautiful, modern design with glassmorphism effects.
- **Error Handling**: API handles errors gracefully and provides clear feedback.
- **Conversation History**: Access to past messages in a conversation.

## **🚀 Tech Stack**

### **Backend**
- **Express.js**: Server-side framework.
- **MongoDB with Mongoose**: Database management and schema modeling.
- **JSON Web Tokens (JWT)**: Authentication and session management.
- **bcrypt**: Secure password hashing.
- **Socket.IO**: Real-time communication.

### **Frontend**
- **React with Vite**: Fast and responsive web applications.
- **Tailwind CSS**: Modern styling framework.
- **Shadcn**: Sleek and reusable UI components.
- **Zustand**: State management library.
- **Lucide and Radix UI**: Icons and emojis for a vibrant UI.
- **React Context and Custom Hooks**: Manage state and logic cleanly.


## **🔗 Integrating Cloudinary for Photo Storage**

This app uses **Cloudinary** to store and manage user-uploaded images.

### **📸 Setting Up Cloudinary**

1. **Create a Cloudinary Account:**
   - Go to [Cloudinary](https://cloudinary.com) and create a free account.
   
2. **Get Your Cloudinary Credentials:**
   - After signing up, you’ll receive a **Cloud name** and **Cloud_preset_name**, Keep these handy.
  
-  ## **Note :**
   -  Setting up CloudinaryCopy link to this heading
As we are going to upload images to Cloudinary, we need to create an upload preset and set the upload mode to unsigned. To do that, log into your Cloudinary account and click on Settings > Upload.

![alt text](https://cloudinary-marketing-res.cloudinary.com/image/upload/c_limit,w_2000/f_auto/q_auto/media_jams/s_7A4CF5DA5B0E63BC163E1954C171ACAAD309FD95DEE6429013A13CBA292D788C_1651779901902_settings.png)

Now, scroll down to upload presets and click on Add upload presets. Then:

Provide an upload preset name.
Set Signing Mode to unsigned, and
Set a desired folder to hold the image uploads (optional).

![alt text](https://cloudinary-marketing-res.cloudinary.com/image/upload/c_limit,w_2000/f_auto/q_auto/media_jams/s_7A4CF5DA5B0E63BC163E1954C171ACAAD309FD95DEE6429013A13CBA292D788C_1651779901902_settings.png)

 
   - create .env file in frontend folder and paste.

       ```bash
       VITE_CLOUD_NAME=your_cloud_name 
       VITE_UPLOAD_PRESET_NAME=cloud_preset_name
       ```

3. **Install Cloudinary SDK:**
   
   - In your frontend, install the Cloudinary package using npm:
     
   ```bash
   npm install cloudinary
   ```

## **💻 Getting Started**

**1 .Cloning the Repository**
```bash
cd https://github.com/himanshu-tyd/WebChatApp.git
cd WebChatApp
```

**2. Install Dependencies:**

Install packeges

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

**3. Set Up Environment Variables :**

Create a .env file in the root directory of your project and add the necessary environment variables, including your Cloudinary credentials.

```bash
PORT=your_port
MONGO_URI=your_mongodb_uri
NODE_ENV=devlopment
```
**4. Run the Application:**

```bash
# Run backend
cd backend
npm start

# Run frontend
cd frontend
npm run dev

```
**5. Open in Browser:**

Open http://localhost:3000 in your browser to start using WebChatApp.

**📜 License**

This project is licensed under the MIT License. See the LICENSE file for details.

**🛠 Contributing**

Contributions are welcome! Please fork the repository and create a pull request for any features, bug fixes, or improvements.

**🌐 Deployments**

- frontend and backend
  render.com
  
**💬 Contact**

For any questions or suggestions, feel free to reach out to me at code.himanshu93@gmail.com.

##

<div align="center" >Happy coding! 🎉</div>









