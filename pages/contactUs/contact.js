function check() {
    let chbox = document.getElementById('agree')
    let btn = document.getElementById("agree-btn");
 
    if (chbox.checked == false){
        btn.style.opacity = "0.7";
        btn.disabled = true;
    } else {
      btn.style.opacity = "1";
      btn.disabled = false;
    }
  }

  let form = document.getElementById("my-form");
    
  async function handleSubmit(event) {
    event.preventDefault();
    let btn = document.getElementById("agree-btn");
    var status = document.getElementById("status");
    let data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        btn.style.display = "none"
        status.style.display = "block"
        status.innerHTML = "Thanks for your submission!";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
             btn.style.display = "none"
            status.style.display = "block"
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
             btn.style.display = "none"
            status.style.display = "block"
            status.innerHTML = "Oops! There was a problem submitting your form"
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
    });
  }
  form.addEventListener("submit", handleSubmit)




  //CAPTCHA
  // var onloadCallback = function() {
  //   alert("grecaptcha is ready!");
  // };
  // var verifyCallback = function(response) {
  //   alert(response);
  // };

  // function checkRecaptcha() {
  //   var response = grecaptcha.getResponse();
  //   if(response.length == 0) { 
  //     //reCaptcha not verified
  //     alert("no pass"); 
  //   }
  //   else { 
  //     //reCaptch verified
  //     alert("pass"); 
  //   }
  // }

  const callback = () => {alert('callback')}