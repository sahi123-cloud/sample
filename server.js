const express = require("express");
const app = express();
const passwordHash = require("password-hash");
const bp = require("body-parser");
const path = require('path');
let initial_path = path.join(__dirname, "public");

app.use(express.static(initial_path));
 
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get("/signup", (req, res) => {
  res.sendFile(path.join(initial_path, "signup.html"));
});
app.get("/",(req,res)=>{
    res.sendFile(path.join(initial_path, "login.html"));
})

app.get("/home", function (req, res) {
  res.sendFile(path.join(initial_path, "home.html"));
});

// ...

app.post("/signup", function (req, res) {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    if (!fullname || !email || !password) {
        return res.send("Please provide all required information.");
      }
  // Check if the email or fullname already exists
  db.collection("userDemo")
    .where("email", "==", email)
    .get()
    .then((emailDocs) => {
      if (!emailDocs.empty) {
        res.send("An account with this email already exists.");
      } else {
        // Check if the fullname already exists
        db.collection("userDemo")
          .where("fullname", "==", fullname)
          .get()
          .then((fullnameDocs) => {
            if (!fullnameDocs.empty) {
              res.send("An account with this fullname already exists.");
            } else {
              // Hash the password before storing it
              const hashedPassword = passwordHash.generate(password);

              // Add user to Firestore
              db.collection("userDemo")
                .add({
                  fullname,
                  email,
                  password: hashedPassword,
                })
                .then(() => {
                  res.sendFile(path.join(initial_path, "login.html"));
                })
                .catch((error) => {
                  console.error("Error adding user: ", error);
                  res.send("Something went wrong");
                });
            }
          });
      }
    })
    .catch((error) => {
      console.error("Error checking for an existing user: ", error);
      res.send("Something went wrong");
    });
});




app.post("/", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(password);
  
    // Check if any of the required fields is undefined
    if (!email || !password) {
      return res.send("Please provide both fullname and password.");
    }
  
    // Retrieve the user with the given fullname
    db.collection("userDemo")
      .where("email", "==", email)
      .get()
      .then((docs) => {
        if (!docs.empty) {
          const user = docs.docs[0].data();
  
          // Verify the provided password with the stored hashed password
          if (passwordHash.verify(password, user.password)) {
            res.sendFile(path.join(initial_path, "home.html"));
          } else {
            res.send("Authentication failed");
          }
        } else {
          res.send("User not found");
        }
      })
      .catch((error) => {
        console.error("Error searching for user: ", error);
        res.send("Something went wrong");
      });
  });
  


app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})
app.get("/blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})
app.listen("3000", () => {
    console.log('listening......');
})