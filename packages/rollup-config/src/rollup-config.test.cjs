const ROLLUP_CONFIG = require('./rollup-config.cjs');

describe('@monorepo-template/rollup-config', () => {
  it('should be optimized by default', () => {
    expect(ROLLUP_CONFIG).toEqual({
      cache: true,
      external: expect.any(Function),
      input: 'src/index.ts',
      plugins: expect.any(Array),
      treeshake: true,
      output: [
        {
          chunkFileNames: '[name]-[hash].cjs',
          dir: './dist/cjs',
          entryFileNames: '[name].cjs',
          exports: 'named',
          format: 'cjs',
          sourcemap: false,
        },
        {
          chunkFileNames: '[name]-[hash].js',
          dir: './dist/esm',
          entryFileNames: '[name].js',
          format: 'es',
          sourcemap: false,
        },
      ],
      watch: {
        exclude: 'node_modules/**',
      },
    });
  });
});
