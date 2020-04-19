<template>
  <div>
    <!-- user.user.name = module.state.value -->
    <h1>Event for {{ user.user.name }}</h1>
    <!--
      Agora chamamos "event.events" onde "event" é o módulo 
      e "events" é o array criado dentro de "state" (do módulo event.js)
    -->
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>|
    </template>
    <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">Next Page</router-link>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store/index";

function getPageEvents(routeTo, next) {
  const current = parseInt(routeTo.query.page) || 1;
  store
    .dispatch("event/fetchEvents", {
      page: current
    })
    .then(() => {
      routeTo.params.page = current;
      next();
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  created() {
    this.perPage = 3;
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    // mapstate agora vai mapear do modulo. (pule para a linha 5)
    ...mapState(["event", "user"])
  }
};
</script>

<style></style>
