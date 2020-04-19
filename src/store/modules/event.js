// "@" equivale a "src". Ex: "@/store/..." = "src/store/".
// Aqui é "*" porque tem vários exports dentro dos arquivos
// de módulos e como queremos acessar tudo usamos o coringa (* - asterisco)
import EventService from "@/services/EventServices";

/**
 * Ativando namespace pra poder chamar algumas
 * coisas de um módulo dentro de outro módulo. Por exemplo "module/[action, state]"
 */
export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
};

/**
 * Actions commitam mutations. Por isso, o método "commit()" tem como
 * primeiro parametro o nome de uma "mutations" e sempre vai ser
 * chamado dentro de uma "action"
 */
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your event has been created!"
        };
        /**
         * 1. Primeiro argumento é a ação de determinado módulo que iremos executar.
         * Aí em baixo vai ser disparada a "action add" do módulo "notification".
         *
         * 2.O segundo argumento é o objeto(payload) que vamos enviar.
         *
         * 3. Terceiro argumento indica que vamos usar um action de um outro módulo,
         * mas que está registrado na raiz (no caso, o módulo notification está sendo
         * importado em "store/index.js" (módulo root)).
         */
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem creating event: " + error.message
        };
        /**
         * 1. Primeiro argumento é a ação de determinado módulo que iremos executar.
         * Aí em baixo vai ser disparada a "action add" do módulo "notification".
         *
         * 2.O segundo argumento é o objeto(payload) que vamos enviar.
         *
         * 3. Terceiro argumento indica que vamos usar um action de um outro módulo,
         * mas que está registrado na raiz (no caso, o módulo notification está sendo
         * importado em "store/index.js" (módulo root)).
         */
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getAllEvents(state.perPage, page)
      .then(response => {
        // commit('mutation_name', params of mutation)
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message
        };
        /**
         * 1. Primeiro argumento é a ação de determinado módulo que iremos executar.
         * Aí em baixo vai ser disparada a "action add" do módulo "notification".
         *
         * 2.O segundo argumento é o objeto(payload) que vamos enviar.
         *
         * 3. Terceiro argumento indica que vamos usar um action de um outro módulo,
         * mas que está registrado na raiz (no caso, o módulo notification está sendo
         * importado em "store/index.js" (módulo root)).
         */
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, state }, id) {
    if (id == state.event.id) {
      return state.event;
    }

    var event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return EventService.getEventById(id).then(response => {
        commit("SET_EVENT", response.data);
        return response.data;
      });
    }
  }
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
