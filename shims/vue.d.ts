declare module '*.vue' {
  import Vue, {defineComponent} from 'vue';

  const component: ReturnType<typeof defineComponent>;

  export default component;
}
