/**
 * Importando o arquivo "api" que contém as configurações do servidor.
 */
import api from "./api";

export default {
  getAllEvents(perPage, page) {
    // Fazendo requisição http GET pra determinada URL
    return api.get("/events?_limit=" + perPage + "&_page=" + page);
  },
  getEventById(id) {
    /**
     * Fazendo requisição http GET passando o ID pra determinada
     * URL pra trazer dados de um evento especificado pelo ID.
     */
    return api.get("/events/" + id);
  },
  postEvent(event) {
    /**
     * Fazendo requisição http POST passando um objeto "evento" pra determinada
     * URL pra gravar dados de um evento no banco.
     */
    return api.post("/events", event);
  }
};
