import { defineConfig } from 'vite';
import decap, { createFolderCollection, createField } from 'vite-plugin-decap-cms';

export default defineConfig({
  publicDir: 'public',
  plugins: [
    decap({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'main', // Change if your default branch is not 'main'
        },
        media_folder: 'public/img',
        public_folder: '/img',
        collections: [
          createFolderCollection({
            name: 'guide',
            label: 'Guide',
            folder: 'docs/guide',
            create: true,
            slug: '{{slug}}',
            editor: { preview: false },
            fields: [
              createField('string', { label: 'Title', name: 'title' }),
              createField('string', { label: 'Description', name: 'description' }),
              createField('markdown', { label: 'Body', name: 'body' }),
            ],
          }),
        ],
      },
    }),
  ],
});
