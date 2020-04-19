/**
 * Importando o módulo axios pra requisições http. Deve instalar
 * com o comando "npm i axios --save".
 */
import axios from "axios";
import NProgress from "nprogress";

const api = axios.create({
  // informando a base da api. no caso é um banco mockado com o json-serve
  baseURL: "http://localhost:3000",
  withCredentials: false,
  // Adicionando os headers padrão na requisição
  headers: {
    Accept: "application/json",
    // aqui somente o content-type tá dentro de aspas por causa do hífen
    "Content-Type": "application/json"
  },
  timeout: 15000
});

/**
 * Interceptor é usado pra no meio da requisição fazer alguma coisa.
 * Aqui estamos mostrando uma barra de progresso caso a requisição
 * demore ao tentar comunicar com o servidor.
 */
api.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

/**
 * Interceptor é usado pra fazer alguma coisa quando estiver recebendo
 * uma reposta. Aqui estamos mostrando uma barra de progresso caso a
 * resposta do servidor demore.
 */
api.interceptors.response.use(response => {
  NProgress.done();
  return response;
});

export default api;
