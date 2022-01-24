export default {
  name: 'daybook',
  component: () => import(/* webpackChunkName: "DayBookLayout" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
  children: [
    {
      path: '',
      name: 'no-entry',
      component: () => import(/* webpackChunkName: "Daybook-No-Entry" */ '@/modules/daybook/views/NoEntrySelected.vue'),
    },
    {
      path: ':id',
      name: 'entry',
      component: () => import(/* webpackChunkName: "Daybook-Entry" */ '@/modules/daybook/views/EntryView.vue'),
    }
  ]
}