window.onload=function() {
  // declarations
  const form = document.querySelector('#form');

  const firstNameInput = document.querySelector("#firstNameInput");
  const lastNameInput = document.querySelector("#lastNameInput");
  const addressInput = document.querySelector("#addressInput");
  const emailInput = document.querySelector("#emailInput");
  const phoneInput = document.querySelector("#phoneInput");
  const policyAgreeInput = document.querySelector("#policyAgreeCheck");
  const messageInput = document.querySelector("#messageInput");
  const firstNameErrorMessage = document.querySelector(".firstNameErrorMessage");
  const lastNameErrorMessage = document.querySelector(".lastNameErrorMessage");
  const addressErrorMessage = document.querySelector(".addressErrorMessage");
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
      if (regaddressCheck(addressInput.value)) {
        emptyMessage(addressErrorMessage);
      } else {
        addressErrorMessage.innerHTML = "Address has no valid format. Not separated by space(s)&nbsp;&#x274C";
        toggleErrorMessage(addressErrorMessage);
      }
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
    errorMessage.classList.add('hide');
  }

  function toggleErrorMessage(errorMessage){
    errorMessage.classList.remove("hide");
    errorMessage.classList.add("show");
  }

  function regfirstandlastnameCheck(nameCheck) {
    let nameRegex = /^[a-zA-Zàâçéèêëîïôûùüÿñæœ /'-]{2,}$/;
    return (nameRegex.test(nameCheck));
  }

  function regaddressCheck(addressCheck) {
    let addressRegex = /^([1-9][e][\s])*([a-zA-Zàâçéèêëîïôûùüÿñ\- /']+(([.][\s])?|([\s]))?)+[1-9][0-9]*(([-]|[\/][1-9][[0-9]*)|([\s]?[a-zA-Z 1-9]+))?$/;
    return (addressRegex.test(addressCheck));
  }

  function regphoneCheck(phoneCheck) {
    let phoneRegex = /^0{1}[0-9]{8,9}$/;
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

  function CheckAll(e){
    firstNameInputVerify();
    lastNameInputVerify();
    phoneInputVerify();
    emailInputVerify();
    messageInputVerify();
    policyAgreeInputVerify();
    if ( (firstNameErrorMessage.innerHTML !== "")||(lastNameErrorMessage.innerHTML !== "")||(phoneErrorMessage.innerHTML !== "")||(emailErrorMessage.innerHTML !== "")||(!policyAgreeInput.checked) ){
      e.preventDefault();
    }
  }

  form.addEventListener('submit', CheckAll);

  firstNameInput.addEventListener('blur',firstNameInputVerify );
  firstNameErrorMessage.addEventListener("click", removeErrorMessage);
  lastNameInput.addEventListener('blur',lastNameInputVerify );
  lastNameErrorMessage.addEventListener('click', removeErrorMessage);
  emailInput.addEventListener('blur', emailInputVerify);
  emailErrorMessage.addEventListener('click', removeErrorMessage);
  phoneInput.addEventListener('blur', phoneInputVerify);
  phoneErrorMessage.addEventListener('click', removeErrorMessage);
  messageInput.addEventListener('blur', messageInputVerify);
  messageErrorMessage.addEventListener('click', removeErrorMessage);
  policyAgreeInput.addEventListener('click', policyAgreeInputVerify);
  policyAgreeErrorMessage.addEventListener('click', removeErrorMessage);
};
