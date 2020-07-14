// NOTE: fetch request does NOT work on Internet Explorer currently
import React from 'react';

const testFirstName = "John";
const testLastName = "Smith";
const testLogin = "jsmith@gmail.com";
const testPassword = "Password1";

const baseURL = "https://recipe-finder-g24.herokuapp.com";
const testEndPoint = '/api/register';

const testJSON = 'firstName='+ testFirstName + ', lastName='+ testLastName +', login='+ testLogin +', password='+ testPassword;

// returns whatever the respective apiEndpoint is suppose to return
// logs any errors to the console
function postToAPI(package2send, route)
{
  const firstName = '';
  const lastName = '';
  const login = '';
  const password = '';



  try
    {
      fetch(baseURL + route, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: testJSON,
        })
      });
    }
    catch(error)
    {
      console.error(error);
    }




}

export default postToAPI;
