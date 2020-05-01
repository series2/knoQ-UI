<template functional>
  <v-chip
    small
    label
    :to="
      props.toTagPageOnClick
        ? { path: '/events', query: { tags: props.name } }
        : undefined
    "
    :ripple="false"
    v-bind="data.attrs"
    :class="data.staticClass"
    v-on="listeners"
  >
    <span class="text--secondary">{{ props.name }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EventTag',
  props: {
    name: {
      type: String,
      required: true,
    },
    toTagPageOnClick: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
