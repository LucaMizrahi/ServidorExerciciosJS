const axios = require("axios");

const options = {
 headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
}


axios
  .post("https://tecweb-js.insper-comp.com.br/token", {
    username: "lucam1",
    options
  })
  .then(function(response) {
    var token = response.data.accessToken;
    //console.log(token);
    options['headers']['Authorization'] = 'Bearer ' + token;
    console.log(options)
    axios
      .get('https://tecweb-js.insper-comp.com.br/exercicio', options)
      .then(function(response) {
        console.log(response.data);
      })
  })



/*   async function getToken() {
    return await axios
    .post("https://tecweb-js.insper-comp.com.br/token", {
      username: "lucam1",
      options
    })
    .then((response) => {
      var token = response.data.accessToken;
      return token;
    })
  }
  getToken().then(
    (token) => console.log(token)
  ) */