import fs from 'fs';
import path from 'path';

/**
 * Génère une arborescence de menu basée sur les dossiers et fichiers .md
 * @param {string} dir - Chemin du dossier à scanner
 * @param {string} basePath - Chemin de base pour les liens
 * @returns {Array} - Tableau d'items de menu
 */
function generateSidebar(dir, basePath = '') {
  const fullPath = path.join(__dirname, '..', dir, basePath);
  
  // Si le dossier n'existe pas, on retourne un tableau vide
  if (!fs.existsSync(fullPath)) return [];
  
  // On récupère tous les fichiers et dossiers
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  
  // On filtre pour ne garder que les dossiers et les fichiers .md
  const items = entries
    .filter(entry => {
      // On ignore les fichiers cachés et index.md
      if (entry.name.startsWith('.')) return false;
      if (entry.name === 'index.md') return false;
      
      // On garde les dossiers et les fichiers .md
      return entry.isDirectory() || entry.name.endsWith('.md');
    })
    .sort((a, b) => {
      // On trie : d'abord les dossiers, puis les fichiers
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    })
    .map(entry => {
      const name = entry.name.replace(/\.md$/, '');
      const relativePath = path.join(basePath, name);
      
      if (entry.isDirectory()) {
        // Si c'est un dossier, on le traite récursivement
        const children = generateSidebar(dir, relativePath);
        return {
          text: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
          collapsed: false, // Déplier par défaut
          items: children.length > 0 ? children : undefined
        };
      } else {
        // Si c'est un fichier .md, on l'ajoute comme lien
        return {
          text: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
          link: `/${dir}/${relativePath}`
        };
      }
    });
  
  return items;
}

// Génère automatiquement le menu pour la section Guide
function getGuideSidebar() {
  return [
    {
      text: 'Guide',
      items: generateSidebar('guide')
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
