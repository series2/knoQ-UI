<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="placeSync"
      filled
      label="場所"
      :rules="$rules.eventPlace"
    />
    <v-dialog width="290px">
      <template #activator="{ on }">
        <v-text-field
          v-model="dateMem"
          filled
          label="開催日"
          readonly
          :rules="$rules.eventDate"
          v-on="on"
        />
      </template>
      <v-date-picker v-model="dateMem" show-current :min="dateMin" />
    </v-dialog>
    <TimePicker
      v-model="timeStartMem"
      label="開始時刻"
      :rules="$rules.eventTimeStart"
      :max="timeEndMem"
    />
    <TimePicker
      v-model="timeEndMem"
      label="終了時刻"
      :rules="$rules.eventTimeEnd"
      :min="timeStartMem"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import 'reflect-metadata'
import { Component, Prop, PropSync, Watch } from 'vue-property-decorator'
import TimePicker from '@/components/shared/TimePicker.vue'
import { getDate, getTime, getIso8601, today } from '@/workers/date'

@Component({
  components: {
    TimePicker,
  },
})
export default class EventFormReservationPrivate extends Vue {
  @PropSync('place', { required: true }) placeSync!: string
  @PropSync('timeStart', { required: true }) timeStartSync!: string
  @PropSync('timeEnd', { required: true }) timeEndSync!: string
  @Prop({ required: true }) value!: boolean

  private dateMem = ''
  private timeStartMem = ''
  private timeEndMem = ''

  @Watch('timeStartSync', { immediate: true })
  private onTimeStartPropChange() {
    this.dateMem = this.timeStartSync && getDate(this.timeStartSync)
    this.timeStartMem = this.timeStartSync && getTime(this.timeStartSync)
  }
  @Watch('timeEndSync', { immediate: true })
  private onTimeEndPropChange() {
    this.dateMem = this.timeEndSync && getDate(this.timeStartSync)
    this.timeEndMem = this.timeEndSync && getTime(this.timeEndSync)
  }

  @Watch('dateMem')
  @Watch('timeStartMem')
  private onTimeStartMemChange() {
    if (this.dateMem && this.timeStartMem) {
      this.timeStartSync = getIso8601(this.dateMem, this.timeStartMem)
    }
  }
  @Watch('dateMem')
  @Watch('timeEndMem')
  private onTimeEndMemChange() {
    if (this.dateMem && this.timeEndMem) {
      this.timeEndSync = getIso8601(this.dateMem, this.timeEndMem)
    }
  }

  get dateMin(): string {
    return today()
  }

  get valid(): boolean {
    return this.value
  }
  set valid(value: boolean) {
    this.$emit('input', value)
  }
}
</script>
