<template functional>
  <v-btn
    depressed
    color="primary"
    v-bind="data.attrs"
    :class="data.staticClass"
    v-on="listeners"
  >
    <slot />
  </v-btn>
</template>

<script>
export default { name: 'FormNextButton' }
</script>
