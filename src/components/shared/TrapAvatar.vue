<template functional>
  <v-avatar :size="props.size" :title="props.traqId">
    <img
      :src="`https://q.trap.jp/api/1.0/public/icon/${props.traqId}`"
      :alt="props.traqId"
    />
  </v-avatar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TrapAvatar',
  props: {
    size: {
      type: String,
      required: true,
    },
    traqId: {
      type: String,
      required: true,
    },
  },
})
</script>
