<template>
  <div>
    <div v-if="!filteredEvents.length">
      <span class="text--secondary headline">
        イベントがありません...
      </span>
    </div>
    <template v-for="(event, i) in filteredEvents" v-else>
      <div v-if="isDateBorder(i)" :key="event.date" class="mb-1 headline">
        {{ formatDate(event.timeStart) }}
      </div>
      <EventListItem :key="event.id" v-bind="event" class="mb-5" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'reflect-metadata'
import { Component, Prop, Watch } from 'vue-property-decorator'
import EventListItem from '@/components/event/EventListItem.vue'
import { formatDate, getDate, DATE_DISPLAY_FORMAT } from '@/workers/date'

interface EventData extends Schemas.Event {
  place: string
}

@Component({
  components: {
    EventListItem,
  },
})
export default class EventList extends Vue {
  @Prop({ required: true }) events!: EventData[]
  @Prop() eventFilter?: (e: any) => boolean

  get filteredEvents() {
    return this.events.filter(this.eventFilter ?? (_ => true))
  }

  get isDateBorder() {
    return (i: number) => {
      if (i === 0) return true
      const e1 = this.filteredEvents[i - 1]
      const e2 = this.filteredEvents[i]
      return getDate(e1.timeStart) !== getDate(e2.timeStart)
    }
  }

  get formatDate() {
    return formatDate(DATE_DISPLAY_FORMAT)
  }
}
</script>
