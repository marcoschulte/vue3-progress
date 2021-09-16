import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import bundleScss from 'rollup-plugin-bundle-scss';

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
      bundleScss({
        exclusive: false,
      }),
      scss({
        output: 'dist/index.css',
        outputStyle: 'compressed',
      }),
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
