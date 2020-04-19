<template>
  <!--
    Uma classe "hard-coded" e uma classe que é criada dentro
    de computed que altera entre os tipos "error" e "success"
  -->
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    /**
     * Criando uma propriedade notification que tem o
     * atributo "type" do tipo object e que é obrigatório.
     * Vai servir pra dizer se a notification é do
     * tipo "error" ou "success".
     */
    notification: {
      type: Object,
      required: true
    }
  },
  /**
   * Dentro de data() são criados os atributos do componente.
   */
  data() {
    return {
      timeout: null
    };
  },
  /**
   * É chamado logo após a intancia ser montada. O que está sendo feito é:
   * depois que a instancia foi montada, foi atribuido à variável "timeout"
   * uma função que executa a cada 5 segundos. Como só temos uma instância
   * do Vue, a chamada de "mounted()" ocorre apenas uma vez.
   */
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  /**
   * É chamado antes de uma instancia Vue ser destruída.
   * Nesse caso, sempre vai executar por que só temos
   * uma instancia do Vue (como um singleton)
   *
   * (Explicação abaixo pescada da aula)
   * Isso garantirá que evitamos um vazamento de memória,
   * não deixando o setTimeout em execução se esse componente
   * não estiver sendo exibido ativamente. Considera-se um anti-padrão
   * JavaScript não limpar seus setTimeouts por esse motivo.
   */
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  /**
   * Variáveis computadas são alteradas apeas se o seu valor mudar.
   * No nosso caso, fica mudando entre "true" ou "false" (que é o nosso
   * "this.notification.type").
   */
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    }
  },
  /**
   * Métodos são executados quando mandamos. No nosso caso,
   * estamos mandando executar a cada 5 segundos (ver a função "mounted()").
   */
  methods: {
    /**
     * O três pontos (...) é chamado de spread operator.
     * Não consegui entender muito bem como funciona,
     * mas eu vou atrás de saber. Por ora estou só usando pra seguir a aula.
     */
    ...mapActions("notification", ["remove"])
  }
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
