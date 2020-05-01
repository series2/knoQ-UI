<script lang="ts">
import Vue from 'vue'
import { render } from '@/workers/markdown-it'

export default Vue.extend({
  name: 'MarkdownField',
  functional: true,
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  render(h, { props, data }) {
    return h('div', {
      class: data.staticClass,
      domProps: { innerHTML: render(props.src) },
    })
  },
})
</script>
