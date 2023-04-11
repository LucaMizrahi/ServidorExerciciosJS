
async function main() {
  const axios = require("axios");

  const options = {
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
  }

  async function getToken() {
    var request = {
      method: 'POST',
      url: 'https://tecweb-js.insper-comp.com.br/token',
      data: {
        username: 'lucam1'
    },
      options
    };
    const response = await axios(request);
    return response.data.accessToken;
  }

  async function getExercicios(token) {
    var request_2 = {
      method: 'GET',
      url: 'https://tecweb-js.insper-comp.com.br/exercicio',
      data: {
        username: 'lucam1'
    },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };
    try {
      const response = await axios(request_2);
      return response.data;
    } catch (error) {
    }
  }

  async function getResponse(token, SLUG, resposta) {
    var request_3 = {
      method: 'POST',
      url: 'https://tecweb-js.insper-comp.com.br/exercicio/' + SLUG,
      data: {
        username: 'lucam1',
        'resposta': resposta
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };
    try {
      const response = await axios(request_3);
      return response.data.sucesso;
    } catch (error) {
    }
  }

  var token = await getToken();
  var exercicios = await getExercicios(token);
  var nome_exercicio = Object.keys(exercicios);

  // Ex1 - Soma Valores
  var SLUG = nome_exercicio[0];
  var exercicio1 = exercicios[SLUG];
  console.log(exercicio1);
  var resposta = exercicio1.entrada.a + exercicio1.entrada.b;
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio1.titulo} está correto? ${verificaResposta}`);

  // Ex2 - Tamanho da String
  var SLUG = nome_exercicio[1];
  var exercicio2 = exercicios[SLUG];
  console.log(exercicio2);
  var resposta = exercicio2.entrada.string.length;
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio2.titulo} está correto? ${verificaResposta}`);

  // Ex3 - Nome do Usuário
  var SLUG = nome_exercicio[2];
  var exercicio3 = exercicios[SLUG];
  console.log(exercicio3);
  var arroba = exercicio3.entrada.email.indexOf('@');
  var resposta = exercicio3.entrada.email.slice(0, arroba);
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio3.titulo} está correto? ${verificaResposta}`);

  // Ex4 - Jaca Wars
  var SLUG = nome_exercicio[3];
  var exercicio4 = exercicios[SLUG];
  console.log(exercicio4);
  var distancia = (exercicio4.entrada.v**2) * Math.sin(2*(exercicio4.entrada.theta*(Math.PI/180))) / 9.8;

  if(distancia <= 102 && distancia >= 98) {
    var resposta = 0;
  } else if (distancia > 102) {
    var resposta = 1;
  } else if (distancia < 98) {
    var resposta = -1;
  }
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio4.titulo} está correto? ${verificaResposta}`);

  // Ex5 - Ano Bissexto
  var SLUG = nome_exercicio[4];
  var exercicio5 = exercicios[SLUG];
  console.log(exercicio5);
  var resposta = false;
  if (exercicio5.entrada.ano % 4 == 0) {
    if (exercicio5.entrada.ano % 100 == 0) {
      if (exercicio5.entrada.ano % 400 == 0) {
        resposta = true;
      }
    } else {
      resposta = true;
    }
  }
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio5.titulo} está correto? ${verificaResposta}`);

  // Ex6 - Volume da Pizza
  var SLUG = nome_exercicio[5];
  var exercicio6 = exercicios[SLUG];
  console.log(exercicio6);
  var resposta = Math.round(Math.pow(exercicio6.entrada.z, 2)* Math.PI * exercicio6.entrada.a);
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio6.titulo} está correto? ${verificaResposta}`);

  // Ex7 - MRU
  var SLUG = nome_exercicio[6];
  var exercicio7 = exercicios[SLUG];
  console.log(exercicio7);
  var resposta = exercicio7.entrada.s0 + (exercicio7.entrada.v * exercicio7.entrada.t);
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio7.titulo} está correto? ${verificaResposta}`);

  // Ex8 - Inverter String
  var SLUG = nome_exercicio[7];
  var exercicio8 = exercicios[SLUG];
  console.log(exercicio8);
  var resposta = exercicio8.entrada.string.split('').reverse().join('');
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio8.titulo} está correto? ${verificaResposta}`);

  // Ex9 - Soma os valores guardados no Objeto
  var SLUG = nome_exercicio[8];
  var exercicio9 = exercicios[SLUG];
  console.log(exercicio9);
  var resposta = 0;
  var objeto = exercicio9.entrada.objeto;
  for(var key in objeto) {
    resposta += objeto[key];
  }
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio9.titulo} está correto? ${verificaResposta}`);

  // Ex10 - Encontra número primo
  var SLUG = nome_exercicio[9];
  var exercicio10 = exercicios[SLUG];
  console.log(exercicio10);
  const isPrime = (num) => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
      if(num % i === 0) return false; 
    return num > 1;
  }
  var contador = 1;
  for(var resposta = 2; contador < exercicio10.entrada.n+1; resposta++) {
    if(isPrime(resposta)) {
      contador++;
    }
  }
  resposta--;
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio10.titulo} está correto? ${verificaResposta}`);

  // Ex11 - Maior prefixo comum
  var SLUG = nome_exercicio[10];
  var exercicio11 = exercicios[SLUG];
  console.log(exercicio11);
  var resposta = '';



  // Ex12 - Soma do maior e menor número
  var SLUG = nome_exercicio[11];
  var exercicio12 = exercicios[SLUG];
  console.log(exercicio12);
  var numeros = exercicio12.entrada.numeros.sort(function(a, b){return a-b});
  var resposta = numeros[1] + numeros[numeros.length-2];
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio12.titulo} está correto? ${verificaResposta}`);

  // Ex13 - Conta Palindromos
  var SLUG = nome_exercicio[12];
  var exercicio13 = exercicios[SLUG];
  console.log(exercicio13);
  var resposta = 0;
  exercicio13.entrada.palavras.forEach(function(palavra) {
    if(palavra.split('').reverse().join('') == palavra) {
      resposta++;
    }
  });
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio13.titulo} está correto? ${verificaResposta}`);

  // Ex14 - Soma de strings de ints
  var SLUG = nome_exercicio[13];
  var exercicio14 = exercicios[SLUG];
  console.log(exercicio14);
  var resposta = exercicio14.entrada.strings.map(n => parseInt(n)).reduce((a, b) => a + b, 0);
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio14.titulo} está correto? ${verificaResposta}`);


  // Ex15 - Soma com requisições
  var SLUG = nome_exercicio[14];
  var exercicio15 = exercicios[SLUG];
  console.log(exercicio15);
  var resposta = 0;
  for(var i = 0; i < exercicio15.entrada.endpoints.length; i++) {
    var request = {
      method: 'get',
      url: exercicio15.entrada.endpoints[i],
      headers: {
        username: 'lucam1'
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };
    const response = await axios(request);
    resposta += response.data;
  }
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio15.titulo} está correto? ${verificaResposta}`);


  // Ex16 - Caça ao tesouro
  var SLUG = nome_exercicio[15];
  var exercicio16 = exercicios[SLUG];
  console.log(exercicio16);
  var resposta = exercicio16.entrada.inicio;
  while(isNaN(resposta)){
    var request = {
      method: 'get',
      url: resposta,
      headers: {
        username: 'lucam1'
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };
  const response = await axios(request);
  resposta = response.data;
  }
  var verificaResposta = await getResponse(token, SLUG, resposta);
  console.log(`O exercício ${exercicio16.titulo} está correto? ${verificaResposta}`);





}

main();



  
//   axios
//     .post("https://tecweb-js.insper-comp.com.br/token", {
//       username: "lucam1",
//       options
//     })
//     .then(function(response) {
//       var token = response.data.accessToken;
//       //console.log(token);
//       options['headers']['Authorization'] = 'Bearer ' + token;
//       console.log(options)
//       axios
//         .get('https://tecweb-js.insper-comp.com.br/exercicio', options)
//         .then(function(response) {
//           console.log(response.data);
//         })
//     })
//   }
// }

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