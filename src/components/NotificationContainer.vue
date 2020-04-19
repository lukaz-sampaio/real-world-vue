<template>
  <div class="notification-container">
    <!-- o for está percorrendo o "notifications" que é o
    "state" (segundo argumento do "mapState")-->
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
/**
 * Importando o componente "NotificationBar"
 */
import NotificationBar from "@/components/NotificationBar.vue";
/**
 * Importando "mapState" usando desestruturação
 * (que serve pra importar somente o método "mapState").
 */
import { mapState } from "vuex";

export default {
  components: {
    // Registrand o componente "NotificationBar"
    NotificationBar
  },
  computed: {
    /**
     * Primeiro argumento é o módulo (no caso 'notification')
     * Segundo argumento é o state (no caso 'notifications'.
     * É o "state" porque estamos usando o "mapState", Se fosse
     * alguma "action" seria "mapActions". O mesmo vale pra
     * "mutations" e "getters").
     */
    ...mapState("notification", ["notifications"])
  }
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>