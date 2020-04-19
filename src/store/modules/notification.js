// export const namespaced = true;

// export const state = {
//   notifications: []
// };

// let nextId = 1;

// export const mutations = {
//   PUSH(state, notification) {
//     state.notifications.push({
//       ...notification,
//       id: nextId++
//     });
//   },
//   DELETE(state, notificationToRemove) {
//     state.notifications = state.notifications.filter(
//       notification => notification.id !== notificationToRemove.id
//     );
//   }
// };

// export const actions = {
//   add({ commit }, notification) {
//     commit("PUSH", notification);
//   },
//   remove({ commit }, notificationToRemove) {
//     commit("DELETE", notificationToRemove);
//   }
// };
let nextId = 1;

export default {
  /**
   * Ativando namespace pra poder chamar algumas
   * coisas de um módulo dentro de outro módulo. Por exemplo "module/[action, state]"
   */
  namespaced: true,

  state: {
    notifications: []
  },

  mutations: {
    PUSH(state, notification) {
      state.notifications.push({
        ...notification,
        id: nextId++
      });
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      );
    }
  },
  actions: {
    add({ commit }, notification) {
      commit("PUSH", notification);
    },
    remove({ commit }, notificationToRemove) {
      commit("DELETE", notificationToRemove);
    }
  }
};
