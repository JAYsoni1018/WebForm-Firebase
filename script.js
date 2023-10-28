

const firebaseConfig = {
  apiKey: "AIzaSyBLFVn6oa2Zu906wX27_DjdzeVHU549Eoc",
  authDomain: "webform-34f06.firebaseapp.com",
  databaseURL: "https://webform-34f06-default-rtdb.firebaseio.com",
  projectId: "webform-34f06",
  storageBucket: "webform-34f06.appspot.com",
  messagingSenderId: "802921416313",
  appId: "1:802921416313:web:df80cb5b9b466c592e76a8"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database().ref("webform");    //webform is my firebase project name 
var auth = firebase.auth();


function register() {
  var user = document.getElementById("uname").value;
  var mob = document.getElementById("mob").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var cpass = document.getElementById("cpass").value;
  // console.log(user, mob, email, pass, cpass);

  const form = document.querySelector("form");
  (uField = form.querySelector(".username")),
    (mField = form.querySelector(".mobile")),
    (eField = form.querySelector(".email")),
    (pField = form.querySelector(".password")),
    (cpField = form.querySelector(".cpassword"))
  validate_user(user);
  validate_key(pass);
  validate_mobile(mob);
  validate_email(email);
  validate_password(pass, cpass);
  if (
    validate_user(user) == true && validate_email(email) == true && validate_mobile(mob) == true && validate_password(pass, cpass) == true) {

    //move to auth
    auth.createUserWithEmailAndPassword(email, pass).then(function () {
      var newuser = auth.currentUser;

      // add to firebase database
      var user_data = {
        Confirm_Password: cpass,
        Password: pass,
        Email: email,
        Mobile_Number: mob,
        UserName: user,
        id: newuser.uid
      };
      db.child("users/" + user).set(user_data);
      // alert("User created!!");
      display_pop_up("User Created Successfully. Please Login.", "success");

    })
      .catch(function (error) {
        var error_code = error.code;
        var error_message = error.message;
        display_pop_up(error_message, "error");

        // alert(error_message);/
      })
  }
}



function display_pop_up(msg, mode) {
  const section = document.querySelector("section"),
    overlay = document.querySelector(".overlay"),
    data = document.querySelector('.data')
  data.innerHTML = '';
  closeBtn = document.querySelector(".close-btn");
  section.classList.add("active");
  if (mode === "success") {
    data.innerHTML = `
  <i class="fa-regular fa-circle-check fa-bounce" style="color: #01aa5b;"></i>
  <h3 class="msg-txt" style="color:green"></h3>

  `
  }
  else if (mode === "error") {
    data.innerHTML = `
  <i class="fa-solid fa-circle-exclamation fa-bounce" style="color: #f21818;"></i>
  <h3 class="msg-txt" style="color:red"></h3>
  `
  }
  const txt = document.querySelector(".msg-txt");
  txt.innerHTML = `${msg}`;

  overlay.addEventListener("click", () =>
    section.classList.remove("active")
  );

  closeBtn.addEventListener("click", () =>
    section.classList.remove("active")
  );
}


function login() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  const form = document.querySelector("form");
  (eField = form.querySelector(".email"));

  (pField = form.querySelector(".password"));

  validate_email(email);
  validate_key(pass);

  if (
    validate_email(email) == true && validate_key(pass) == true) {

    //move to auth
    auth.signInWithEmailAndPassword(email, pass).then(function () {
      var newuser = auth.currentUser;

      // add to firebase database
      // var user_data = {
      //   UserName: user,
      //   Mobile_Number: mob,
      //   Email: email,
      //   Password: pass,
      //   Confirm_Password: cpass
      // };
      // db.child("users/" + newuser.uid).set(user_data);   //write update in place of set if u want to update database on login
      // alert("User logged in!!");
      display_pop_up("User Login Successfully.", "success");

    })
      .catch(function (error) {
        var error_code = error.code;
        var error_message = error.message;
        // alert(error_message);
        display_pop_up(error_message, "error");

      })
  }


}
function validate_password(pass, cpass) {
  if (pass.length >= 6 && cpass.length >= 6 && pass === cpass) {

    cpField.classList.remove("error");
    cpField.classList.add("valid");
    return true;
  } else {

    cpField.classList.add("error");
    cpField.classList.remove("valid");
    let errorTxt2 = cpField.querySelector(".error-txt");
    if (pass !== cpass) {
      errorTxt2.innerText = "Confirm password must be the same as the password";
    } else {
      errorTxt2.innerText = "";
    }
    return false;
  }
}



function validate_key(pass) {
  if (pass.length >= 6) {

    pField.classList.remove("error");
    pField.classList.add("valid");

    return true;
  } else {
    if (pass.length === 0) {
      pField.classList.remove("valid");
      pField.classList.add("error");
      let errorTxt1 = pField.querySelector(".error-txt");
      errorTxt1.innerText = "Password can't be blank";
    }
    else {
      pField.classList.add("error");
      pField.classList.remove("valid");
      let errorTxt1 = pField.querySelector(".error-txt");
      errorTxt1.innerText = "Password length must be at least 6 characters";
      return false;
    }

  }
}

function validate_user(user) {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (usernameRegex.test(user)) {
    uField.classList.remove("error");
    uField.classList.add("valid");
    return true;
  } else if (user.length == 0) {
    uField.classList.add("error");
    uField.classList.remove("valid");
    return false;

  }

  else {
    uField.classList.add("error");
    uField.classList.remove("valid");
    let errorTxt5 = uField.querySelector(".error-txt");
    errorTxt5.innerText = "Enter a valid User Name";
    return false;
  }
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email)) {
    eField.classList.remove("error");
    eField.classList.add("valid");
    return true;
  }

  else if (email.length == 0) {
    eField.classList.add("error");
    eField.classList.remove("valid");
    return false;

  }
  else {
    eField.classList.add("error");
    eField.classList.remove("valid");
    let errorTxt = eField.querySelector(".error-txt");
    errorTxt.innerText = "Enter a valid email address";
    return false;
  }
}


function validate_mobile(mob) {
  const mobileRegex = /^[0-9]{10}$/;
  if (mobileRegex.test(mob)) {
    mField.classList.remove("error");
    mField.classList.add("valid");
    return true;
  }
  else if (mob.length == 0) {
    mField.classList.add("error");
    mField.classList.remove("valid");
    return false;

  }
  else {
    mField.classList.add("error");
    mField.classList.remove("valid");
    let errorTxt4 = mField.querySelector(".error-txt");
    errorTxt4.innerText = "Enter a valid 10-digit Mobile Number";
    return false;
  }
}
