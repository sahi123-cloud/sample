let firebaseConfig = {
    apiKey: "AIzaSyCVHxUZrQaEGJSnF5yN42vMaCYPB0OGgdw",
    authDomain: "blogsite-750f1.firebaseapp.com",
    projectId: "blogsite-750f1",
    storageBucket: "blogsite-750f1.appspot.com",
    messagingSenderId: "733205115189",
    appId: "1:733205115189:web:c99a174714d45747681c7c",
    measurementId: "G-NWMX2LECXV"
  };
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
  const imageURLField = document.querySelector('.image-url');
  const blogTitleField = document.querySelector('.title');
  const articleField = document.querySelector('.article');
  const publishBtn = document.querySelector('.publish-btn');
  
  publishBtn.addEventListener('click', () => {
    const docRef = db.collection("blogs").doc();
    docRef.set({
      imageUrl: imageURLField.value,
      title: blogTitleField.value,
      article: articleField.value
    })
      .then(() => {
       window.location.href="home.html"
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
  
  