const API_URL = "https://5fb084f37edddb0016468559.mockapi.io/api";

function callAPI(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err); 
  });
}

document.formRegister.respassword.addEventListener("keyup", function () {
  var password = document.formRegister.password.value;
  var respassword = document.formRegister.respassword.value;
  if (password !== respassword) {
    document.formRegister.respassword.style.border = "1px solid red";
  } else {
    document.formRegister.respassword.style.border = "1px solid #ced4da";
  }
});
var countError = 0;
function testUsername() {
  var x = document.formRegister.userName.value;
  var user;
  callAPI('users','GET',null).then(res => {
    user = res.data;
    if(x === ""){
      document.getElementById("demo1").style.display = "none";
        document.getElementById("demo").style.display = "none";
    } else {
      for(i in user){
        if(user[i].userName !== x){
          document.getElementById("demo1").style.display = "block";
          document.getElementById("demo").style.display = "none";
          countError = 0;
        } else {
          document.getElementById("demo").style.display = "block";
          document.getElementById("demo1").style.display = "none";
          countError = 1;
        }
      }
    }
    
  })
}

function register() {
  var val;
  val = Math.floor(1000 + Math.random() * 9000);
  var respassword = document.formRegister.respassword.value;
  var userData = {
    userName: document.formRegister.userName.value,
    password: document.formRegister.password.value,
    name: document.formRegister.Name.value,
    phone: document.formRegister.phone.value,
    email: document.formRegister.email.value,
    address: document.formRegister.address.value,
    confirm: val,
    isAdmin: false, 
  };
  var x = document.getElementsByClassName("inputform");
  var count=0;
  var message = `
          <h3>Xác nhận Email</h3>
          <ul>
          <li>Mã xác nhận của bạn là:<h5>${val}</h5> </li>
          </ul>
          <span>Cám ơn bạn đã đăng kí tài khoản!</span>
          `;
  for (var i = 0; i < x.length; i++) {
    if (x[i].value == "") {
      count++;
      alert("Vui lòng điền " + x[i].placeholder);
    } else {
      count = 0;
    }
  }
  if (userData.password === respassword && count == 0 && countError == 0) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "napdantv999@gmail.com",
      Password: "",
      SecureToken: "fdc24250-e2e0-479d-9c95-81035c168890",
      To: userData.email,
      // 
      From: "napdantv999@gmail.com",
      Subject: "Xác nhận email",
      Body: message,
    }).then((message) => alert(message));
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "confirm.html";
  } else {
    alert("Mật khẩu không khớp hoặc tên đăng nhập không hợp lệ!");
  }
}