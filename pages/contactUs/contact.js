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


//Captcha
let captcha = document.querySelector('.captcha-wrapper');

captcha.addEventListener("click", () => captcha.style.display = 'none');

function openRecaptcha() {
  captcha.style.display = 'flex'
}

function checkRecaptcha() {
let btn = document.getElementById("submit-btn");
btn.click();
captcha.style.display = 'none'
}

form.addEventListener("submit", handleSubmit);
