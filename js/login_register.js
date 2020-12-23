
// jquery
$(document).ready(() =>{
  $('#router_login').click(() =>{
    $('.frm_rigister').css('display','none')
    $('.frm_login').css('display','block')
  });
  $('#router_rigister').click(() =>{
    $('.frm_login').css('display','none')
    $('.frm_rigister').css('display','block')
  });
});

$(document).ready(() =>{
  const password = $("#password");
  $("#check").click(() =>{
    if(password.prop('type') == 'password'){
      password.attr('type','text');
    }else{
      password.attr('type','password');
    }
  });
});

// API

const API_URL = "https://5fb55c4c43cb320016fd6cf1.mockapi.io/api";

function callAPI(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}





function login(){
  // var confirm = [{
  //   email: "loc123@gmail.com",
  //   pass: "123"
  // }];

  var users;
  callAPI("users", "GET", null).then((res) => {
    users = res.data;
    console.log(users);
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var x = document.getElementsByClassName("form-input");
    var count = 0;
    for(i in x){
      if(x[i].value == ""){
        alert("Xin hãy nhập " + x[i].placeholder);
        count++;
      }
    }
    var reg = /^\w+@[a-zA-Z]{3,}\.com$/i;
    
    if( count === 0 ){
      if(reg.test(email)){
        for(i in users){
          // debugger;
          if(email === users[i].email && password === users[i].password && users[i].isAdmin == true){
            window.location.href = "admin.html";
          }else{
            if(email === users[i].email && password === users[i].password && users[i].isAdmin == false){
              window.location.href = "index.html";
              customer = [
                {
                  id: users[i].id,
                  name: users[i].Name,
                },
              ];
            }else{
              if(email === users[i].email || password === users[i].password){
                document.getElementById("password").value = "";
                alert("Email hoặc mật khẩu không đúng, xin kiểm tra lại!");
              }
            }
          }
        }
      }else{
        alert("Email Không hợp lệ");
      }
    }
    localStorage.setItem("customer", JSON.stringify(customer));
  });
}

function CheckPass() {
  var password = document.getElementById("password_rgt").value;
  var re_password = document.getElementById("re_password_rgt").value;
  if(re_password == password){
    document.getElementById("re_password_rgt").style.borderColor = "#0593f1";
  }else{
    document.getElementById("re_password_rgt").style.borderColor = "red";
  }
}