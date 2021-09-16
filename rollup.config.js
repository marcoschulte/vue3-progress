import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';

export default async function config(args) {
  return {
    input: 'src/index.ts',
    output: {
      name: 'vue3-progess',
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      vue(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: null,
        },
      })],
  };
}
