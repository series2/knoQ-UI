<template>
  <v-chip small label v-bind="$attrs" v-on="$listeners">
    <span class="text--secondary">{{ name }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'
import 'reflect-metadata'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class EventTag extends Vue {
  @Prop({ required: true }) name!: string
}
</script>
