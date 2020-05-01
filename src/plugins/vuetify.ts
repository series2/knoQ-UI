import Vue from 'vue'
import Vuetify, {
  VAvatar,
  VBtn,
  VChip,
  VIcon,
  VList,
  VListItem,
  VListItemSubtitle,
  VMenu,
} from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify, {
  components: {
    VAvatar,
    VBtn,
    VChip,
    VIcon,
    VList,
    VListItem,
    VListItemSubtitle,
    VMenu,
  },
})

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal.base,
        secondary: colors.blueGrey.lighten1,
        accent: colors.brown.base,
        success: colors.green.lighten1,
        info: colors.blue.lighten2,
        warning: colors.amber.darken1,
        error: colors.red.lighten1,
        background: '#f4f7f9',
      },
    },
  },
})
