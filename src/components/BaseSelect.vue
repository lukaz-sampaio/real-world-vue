<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      v-on="$listeners"
      @change="updateValue"
      v-bind="$attrs"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    value: [String, Number],
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>
