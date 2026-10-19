import { defineConfig } from 'vite';

export default defineConfig({
  // Keep emitted asset URLs relative so the built lanyard module also works
  // when this portfolio is opened directly from the local file system.
  base: './',
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      // Build the interactive scene on its own. The portfolio's root HTML is
      // intentionally a standalone file and loads the resulting module.
      input: 'src/lanyard-entry.jsx',
      output: {
        // index.html deliberately references this filename so it remains a
        // dependable entry point outside of a Vite development server.
        entryFileNames: 'assets/lanyard.js'
      }
    }
  }
});
