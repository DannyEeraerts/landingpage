window.onload=function() {
  // declarations
  const ax = axios.create({
   baseURL: 'https://dannyeeraerts.github.io/landingpage/public'
    /*baseURL: 'http://localhost:8888/landingpage/public'*/
  });

  const form = document.querySelector('#form');

  const firstNameInput = document.querySelector("#firstNameInput");
  const lastNameInput = document.querySelector("#lastNameInput");
  const addressInput = document.querySelector("#addressInput");
  const postalNumberInput = document.querySelector('#zipInput');
  const target = document.getElementById('target');
  const emailInput = document.querySelector("#emailInput");
  const phoneInput = document.querySelector("#phoneInput");
  const policyAgreeInput = document.querySelector("#policyAgreeCheck");
  const messageInput = document.querySelector("#messageInput");
  const firstNameErrorMessage = document.querySelector(".firstNameErrorMessage");
  const lastNameErrorMessage = document.querySelector(".lastNameErrorMessage");
  const addressErrorMessage = document.querySelector(".addressErrorMessage");
  const zipErrorMessage = document.querySelector(".zipErrorMessage");
  const emailErrorMessage = document.querySelector(".emailErrorMessage");
  const phoneErrorMessage = document.querySelector(".phoneErrorMessage");
  const messageErrorMessage = document.querySelector(".messageErrorMessage");
  const policyAgreeErrorMessage = document.querySelector(".policyAgreeErrorMessage");

  // functions

  function firstNameInputVerify() {
    if (firstNameInput.value !== ""){
      if (regfirstandlastnameCheck(firstNameInput.value)) {
        emptyMessage(firstNameErrorMessage);
      } else {
        firstNameErrorMessage.innerHTML = "Min 2 letters, no numerals or symbols &nbsp;&#x274C";
        toggleErrorMessage(firstNameErrorMessage);
      }
    }
    else {
      firstNameErrorMessage.innerHTML = "Firstname is required &nbsp;&nbsp;&#x274C;";
      toggleErrorMessage(firstNameErrorMessage);
    }
  }

  function lastNameInputVerify() {
    if (lastNameInput.value !== ""){
      if (regfirstandlastnameCheck(lastNameInput.value)) {
        emptyMessage(lastNameErrorMessage);
      } else {
        lastNameErrorMessage.innerHTML = "Min 2 letters, no numerals or symbols &nbsp;&#x274C";
        toggleErrorMessage(lastNameErrorMessage);
      }
    }
    else {
      lastNameErrorMessage.innerHTML = "Lastname is required &nbsp;&nbsp;&#x274C;";
      toggleErrorMessage(lastNameErrorMessage);
    }
  }

  function addressInputVerify() {
    if (addressInput.value !== "") {
      if (addressCheck(addressInput.value)) {
        emptyMessage(addressErrorMessage);
      } else {
        addressErrorMessage.innerHTML = "Min 2 characters&nbsp;&nbsp;&#x274C";
        toggleErrorMessage(addressErrorMessage);
      }
    }
  }

  function buildTemplate(array) {
    array.forEach(element => {
      let tmpl = document.createElement('option');
      tmpl.setAttribute("value", element[0]);
      tmpl.innerHTML = element[0];
      target.appendChild(tmpl);
    });
  }

  function postalNumberVerify() {
    if (postalNumberInput.value !== "") {

      if (regPostalNumberCheck(postalNumberInput.value)) {
        connect_with_json_file(ax, postalNumberInput.value);
        console.log(zipErrorMessage.className);
        if (zipErrorMessage.className === "zipErrorMessage hide") {
          console.log("voor zoeken");
          let arrayCities = [];
          find_cities_with_same_postnr(ax, postalNumberInput.value, arrayCities);
          target.innerHTML = "";
          setTimeout(() => {
              buildTemplate(arrayCities);
          }, 550);
        } else {
          target.innerHTML = "";
        }
      } else {
        target.innerHTML = "";
        zipErrorMessage.innerHTML = "Not a belgian postal number.&nbsp;&nbsp;&#x274C";
        toggleErrorMessage(zipErrorMessage);
      }
      /*} else {
        target.innerHTML = "";
        zipErrorMessage.innerHTML = "Postalnumber is required&nbsp;&nbsp;&#x274C;";
        toggleErrorMessage(zipErrorMessage);
      }*/

    }
  }

  function phoneInputVerify() {
    if (phoneInput.value !== "") {
      if (regphoneCheck(phoneInput.value)) {
        emptyMessage(phoneErrorMessage);
      } else {
        phoneErrorMessage.innerHTML = "Phone has no valid format&nbsp;&#x274C";
        toggleErrorMessage(phoneErrorMessage);
      }
    } else {
      phoneErrorMessage.innerHTML = "Phone is required&nbsp;&nbsp;&#x274C";
      toggleErrorMessage(phoneErrorMessage);
    }
  }

  function emailInputVerify() {
    if (emailInput.value !== "") {
      if (regMailCheck(emailInput.value)) {
        emptyMessage(emailErrorMessage);
        emailInput.value = cleanEmail(emailInput.value);
      } else {
        emailErrorMessage.innerHTML = "Email has no valid format&nbsp;&nbsp;&#x274C";
        toggleErrorMessage(emailErrorMessage);
      }
    } else {
      emailErrorMessage.innerHTML = "Email is required&nbsp;&nbsp;&#x274C";
      toggleErrorMessage(emailErrorMessage);
    }
  }

  function messageInputVerify() {
    if (messageInput.value !== ""){
      if (messageCheck(messageInput.value)) {
        emptyMessage(messageErrorMessage);
      } else {
        messageErrorMessage.innerHTML = "Message has no valid format(min 12 and max 1000 characters) &nbsp;&#x274C";
        toggleErrorMessage(messageErrorMessage);
      }
    }
    else {
      messageErrorMessage.innerHTML = "Message is required &nbsp;&nbsp;&#x274C;";
      toggleErrorMessage(messageErrorMessage);
    }
  }

  function policyAgreeInputVerify() {
    if (!policyAgreeInput.checked) {
      policyAgreeErrorMessage.innerHTML = "Agreement with privacy policy is required&nbsp;&nbsp;&#x274C";
      toggleErrorMessage(policyAgreeErrorMessage);
    }
    else {
      emptyMessage(policyAgreeErrorMessage);
    }
  }

  function emptyMessage(errorMessage){
    errorMessage.innerHTML = "";
    errorMessage.classList.remove("show");
    errorMessage.classList.add("hide");
  }

  function toggleErrorMessage(errorMessage){
    errorMessage.classList.remove("hide");
    errorMessage.classList.add("show");
  }

  function regfirstandlastnameCheck(nameCheck) {
    let nameRegex = /^[a-zA-Zàâçéèêëîïôûùüÿñæœ /'-]{2,}$/;
    return (nameRegex.test(nameCheck));
  }

  function addressCheck(nameCheck) {
    let nameRegex = /^[a-zA-Z0-9àâçéèêëîïôûùüÿñæœ /'-]{2,}$/;
    return (nameRegex.test(nameCheck));
  }

  function regPostalNumberCheck(postalnumberCheck) {
    let postalnumberRegex = /^(?:(?:[0-9])(?:\d{3}))$/;
    return (postalnumberRegex.test(postalnumberCheck));
  }

  function regphoneCheck(phoneCheck) {
    let phoneRegex = /^0[0-9]{8,9}$/;
    return (phoneRegex.test(phoneCheck));
  }

  function regMailCheck(mailCheck) {
    let emailRegex = /^(([\-\w]+)\.?)+@(([\-\w]+)\.?)+\.[a-zA-Z]{2,6}$/;
    return (emailRegex.test(mailCheck));
  }

  function messageCheck(messageCheck) {
    let messageRegex = /^.{12,1000}$/;
    return (messageRegex.test(messageCheck));
  }

  function removeErrorMessage() {
    this.classList.remove("show");
    this.classList.add("hide");
  }

  function cleanEmail(string) {
    return string.toLowerCase();
  }

  function connect_with_json_file(ax, postalNumber) {
    ax.get("zipcode-belgium.json")
    .then((response) => {
      let result = response.data;
      for (let i = 0; i < result.length; i++) {
        if (parseInt(result[i].zip) === parseInt(postalNumber)) {
          console.log(parseInt(result[i].zip));
          emptyMessage(zipErrorMessage);
          console.log("leeg maken");
          console.log(zipErrorMessage.className);
          return;
        } else {
          zipErrorMessage.innerHTML = "This is not a Belgian postal number.&nbsp;&nbsp;&#x274C";
          toggleErrorMessage(zipErrorMessage);
        }
      }
      //build template one

    })
    .catch((error) => {
      console.log("connection failure");
      //catch error
      console.log(error);
    });
  }

  function find_cities_with_same_postnr(ax, postalNumber, arrayCities) {
    ax.get("zipcode-belgium.json")
    .then((response) => {
      console.log("in find cities");
      let result = response.data;
      for (let i = 0; i < result.length; i++) {
        if (parseInt(result[i].zip) === parseInt(postalNumber)) {
          let gemeente = result[i].city.toLowerCase();
          let gemeenteZip = parseInt(result[i].zip);
          let gemeenteFirstLetterCapitalize = gemeente.charAt(0).toUpperCase() + gemeente.slice(1);
          arrayCities.push([gemeenteFirstLetterCapitalize, gemeenteZip]);
        }
      }
      return arrayCities;
    })
    .catch((error) => {
      //catch error
      console.log(error);
      console.log("This path is not found , please try again <span class='stop'>×</span>");
    });
  }

    function CheckAll(e){
    firstNameInputVerify();
    lastNameInputVerify();
    addressInputVerify();
    phoneInputVerify();
    emailInputVerify();
    messageInputVerify();
    policyAgreeInputVerify();
    if ( (firstNameErrorMessage.innerHTML !== "")||(lastNameErrorMessage.innerHTML !== "")||(phoneErrorMessage.innerHTML !== "")||(emailErrorMessage.innerHTML !== "")||(messageErrorMessage.innerHTML !== "")||(!policyAgreeInput.checked) ){
      e.preventDefault();
    }
  }

  form.addEventListener('submit', CheckAll);

  firstNameInput.addEventListener('blur',firstNameInputVerify );
  firstNameErrorMessage.addEventListener("click", removeErrorMessage);
  lastNameInput.addEventListener('blur',lastNameInputVerify );
  lastNameErrorMessage.addEventListener('click', removeErrorMessage);
  addressInput.addEventListener('blur', addressInputVerify);
  addressErrorMessage.addEventListener('click', removeErrorMessage);
  postalNumberInput.addEventListener('keyup', postalNumberVerify);
  postalNumberInput.addEventListener('blur', postalNumberVerify);
  zipErrorMessage.addEventListener('click', removeErrorMessage);
  emailInput.addEventListener('blur', emailInputVerify);
  emailErrorMessage.addEventListener('click', removeErrorMessage);
  phoneInput.addEventListener('blur', phoneInputVerify);
  phoneErrorMessage.addEventListener('click', removeErrorMessage);
  messageInput.addEventListener('blur', messageInputVerify);
  messageErrorMessage.addEventListener('click', removeErrorMessage);
  policyAgreeInput.addEventListener('click', policyAgreeInputVerify);
  policyAgreeErrorMessage.addEventListener('click', removeErrorMessage);
};
