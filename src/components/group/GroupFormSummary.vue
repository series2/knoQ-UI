<template>
  <div>
    <SummaryItem>
      <SummaryItemCaption>New Group</SummaryItemCaption>
      <SummaryItemMain>{{ name }}</SummaryItemMain>
      <SummaryItemSubtext>
        <v-icon :color="openIcon.color">{{ openIcon.icon }}</v-icon>
        {{ openString }}
      </SummaryItemSubtext>
    </SummaryItem>
    <SummaryItem>
      <SummaryItemCaption>Members</SummaryItemCaption>
      <TrapAvatar
        v-for="name in memberNames"
        :key="name"
        :traq-id="name"
        size="36"
        class="mr-2"
      />
    </SummaryItem>
    <SummaryItem>
      <SummaryItemCaption>Description</SummaryItemCaption>
      <MarkdownField :src="description" />
    </SummaryItem>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'reflect-metadata'
import { Component, Prop } from 'vue-property-decorator'
import MarkdownField from '@/components/shared/MarkdownField.vue'
import TrapAvatar from '@/components/shared/TrapAvatar.vue'
import SummaryItem from '@/components/shared/SummaryItem.vue'
import SummaryItemCaption from '@/components/shared/SummaryItemCaption.vue'
import SummaryItemMain from '@/components/shared/SummaryItemMain.vue'
import SummaryItemSubtext from '@/components/shared/SummaryItemSubtext.vue'

@Component({
  components: {
    MarkdownField,
    TrapAvatar,
    SummaryItem,
    SummaryItemCaption,
    SummaryItemMain,
    SummaryItemSubtext,
  },
})
export default class GroupEventFormSummary extends Vue {
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) description!: string
  @Prop({ required: true }) members!: string[]
  @Prop({ required: true }) open!: boolean

  get openString(): string {
    return this.open
      ? '自由参加可能なグループです'
      : '自由参加できないグループです'
  }

  get memberNames(): (string | undefined)[] {
    const nameById = this.$store.direct.getters.usersCache.nameById
    return this.members.map(nameById)
  }

  get openIcon() {
    return this.open
      ? { icon: 'mdi-account-multiple-plus', color: 'success' }
      : { icon: 'mdi-account-multiple-remove', color: 'error' }
  }
}
</script>
