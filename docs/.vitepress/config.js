export default {
  themeConfig: {
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Référence', link: '/reference/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Logo', link: '/guide/logo' },
            { text: 'Couleur', link: '/guide/couleur' },
            { text: 'Typographie', link: '/guide/typographie' },
            { text: 'Bouton', link: '/guide/bouton' },
            { text: 'Statut', link: '/guide/statut' },
          ]
        }
      ],
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
