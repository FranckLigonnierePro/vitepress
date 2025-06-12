import fs from 'fs';
import path from 'path';

function getGuideSidebar() {
  const guideDir = path.resolve(__dirname, '../guide');
  const files = fs.readdirSync(guideDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .map(f => {
      const name = f.replace('.md', '');
      return {
        text: name.charAt(0).toUpperCase() + name.slice(1),
        link: `/guide/${name}`
      };
    });
  return [
    {
      text: 'Guide',
      items: files
    }
  ];
}

export default {
  themeConfig: {
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Référence', link: '/reference/' }
    ],
    sidebar: {
      '/guide/': getGuideSidebar(),
      '/reference/': [
        {
          text: 'Référence',
          items: [
            { text: 'Configuration', link: '/reference/configuration' },
            { text: 'API', link: '/reference/api' }
          ]
        }
      ]
    }
  }
}
