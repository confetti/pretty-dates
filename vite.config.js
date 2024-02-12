export default {
  build: {
    outDir: './',
    emptyOutDir: false,
    target: 'ES2015',
    minify: false,
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [/^dayjs(\/.*)?$/],
    },
  },
  test: {
    include: ['test/*.ts'],
    globals: true,
  },
}
