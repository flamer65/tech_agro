const { response } = require("express");

const API_URL = 'http://localhost:5000/api';

function adduser()
{
  const name = $('#name').val();
  const mail = $('#mail').val();
  const password = $('#password').val();
  const age = $('#age').val();
  const farmsize = $('#farm-size').val();
  const farmlocation = $('#farm-location').val();

  const body = {
    name, mail, password, age, farmsize, farmlocation
  };
  console.log(body);

  $.post(`${API_URL}/users`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
}

$('#login').on('click', () => {
  const email = $('#email').val();
  const password = $('#password').val();
  
  $.ajax({
    url: `${API_URL}/users`,
    type: 'GET',
    headers: {
      'Authorization': `Basic ${btoa(`${email}:${password}`)}`
    },
    success: (data) => {
      // Handle success here
      console.log('Login successful!');
    },
    error: (xhr, textStatus, errorThrown) => {
      // Handle error here
      console.error(`Error: ${textStatus} - ${errorThrown}`);
    }
  });
});
