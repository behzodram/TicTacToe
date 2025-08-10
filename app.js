// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB85H7SaqfcOQWTlWQUzvtawto4pi9Rr_Y",
    authDomain: "tictactoe-5e57d.firebaseapp.com",
    projectId: "tictactoe-5e57d",
    storageBucket: "tictactoe-5e57d.firebasestorage.app",
    messagingSenderId: "1035924406511",
    appId: "1:1035924406511:web:12bd3b85d0995e1a1b5b1a",
    measurementId: "G-XBTT8GBHL3",
    databaseURL: "https://tictactoe-5e57d-default-rtdb.firebaseio.com/"
};


// Firebase ni ishga tushirish
firebase.initializeApp(firebaseConfig);

// Auth reference
const auth = firebase.auth();

// Google provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// DOM elementlari
const googleSignInBtn = document.getElementById('googleSignIn');
const signOutBtn = document.getElementById('signOut');
const userInfoDiv = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhoto = document.getElementById('user-photo');

// Google orqali kirish
googleSignInBtn.addEventListener('click', () => {
  auth.signInWithPopup(googleProvider)
    .then((result) => {
      // Kirish muvaffaqiyatli
      console.log('Kirish muvaffaqiyatli:', result.user);
    })
    .catch((error) => {
      // Xatolik yuz berdi
      console.error('Xatolik:', error);
      alert('Kirishda xatolik: ' + error.message);
    });
});

// Chiqish
signOutBtn.addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      console.log('Foydalanuvchi chiqdi');
    })
    .catch((error) => {
      console.error('Chiqishda xatolik:', error);
    });
});

// Auth state observer
auth.onAuthStateChanged((user) => {
  if (user) {
    // Foydalanuvchi kirdi
    console.log('Foydalanuvchi kirdi:', user);
    userInfoDiv.style.display = 'block';
    googleSignInBtn.style.display = 'none';
    signOutBtn.style.display = 'inline-block';
    
    // Foydalanuvchi ma'lumotlarini ko'rsatish
    userName.textContent = 'Ism: ' + user.displayName;
    userEmail.textContent = 'Email: ' + user.email;
    userPhoto.src = user.photoURL || '';
  } else {
    // Foydalanuvchi chiqdi
    console.log('Foydalanuvchi chiqdi');
    userInfoDiv.style.display = 'none';
    googleSignInBtn.style.display = 'inline-block';
    signOutBtn.style.display = 'none';
  }
});