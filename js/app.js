// Initialization
const coupon = {
  logo: "hm.com.jpg",
  title: "Get 50% off your purchase",
  description: "Spend $100 or more on items across the site and receive 30% off plus free shipping.",
  code: "LOOKINGGOOD",
}

$("#store-logo").attr("src", "images/"+coupon.logo);
$("#coupon-title").text(coupon.title);
$("#coupon-description").text(coupon.description);
$("#code").val(coupon.code);


const copyToClipboard = () => {
  $("#code").select();
  let success = document.execCommand('copy');
  $("#copy-button").focus()
  $("#copy-button-text").text("Copied!");
  $("#icon-copy").attr("src", "icons/tick.svg");

  setTimeout(() => {     //Set original text after 2.5 secs
      $("#copy-button-text").text("Copy");
      $("#icon-copy").attr("src", "icons/copy.svg");
    }
    , 2500)
}

const validateEmailAddress = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const subscribe = () => {
  $("#error-message").hide();
  $("#alert").hide();
  let email = $("#email").val();
  console.log(email);
  if (!validateEmailAddress(email)){
    $("#error-message").show();
    return;
  }
  // $("#form-block").hide()
  requestSubscibe(email);
}

//Server request
const requestSubscibe = (email) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"email":email});

  var requestOptions = { method: 'POST', headers: myHeaders,body: raw };

  fetch("http://localhost:8000/api/subscribe", requestOptions)
    .then(response => {
      if (response.status == 200){
        showOk();
      }else{
        showError(response.status);
      }
    })
    .catch(error => console.log('error', error));
}

const showError = (status) => {
  if (status == 409){
    $("#response-error-message").text("Email already subscribed")
  }else{
    $("#response-error-message").text("Error. Please try again later")
  }
  $("#alert").show();
}

const showOk = () => {
  $("#form-block").hide();
  $("#success").show();
  setTimeout(() => {     //Set original text after 2.5 secs
    $("#success").hide();
    $("#form-block").show();
  }
  , 2500)
}

//Events
$("#click-me").click(() => $("#coupon-info").modal('show'));

$("#copy-button").click(copyToClipboard);

$("#subscribe-button").click(subscribe);

