const config = {
  siteMetadataTitle:
    '神奈川県藤沢市の在宅看護センター、カフェ&リラクゼーションサロン、イベントスペース、自家菜園',
  siteMetadataDescription:
    'Life & Comは神奈川県藤沢市を拠点に、訪問看護事業やカフェ&リラクゼーションサロン、ワークショップの企画・運営などの複数の分野でみなさまの暮らしをサポートします。',
  siteMetadataAuthor: '@MrSung',
  siteUrl: 'https://life-and-com.jp',
  microCmsEndpoints: [
    {
      endpoint: 'external-links',
      format: 'object',
    },
    {
      endpoint: 'intro',
      format: 'object',
    },
    {
      endpoint: 'mission',
      format: 'object',
    },
    {
      endpoint: 'service',
      format: 'object',
    },
    {
      endpoint: 'service-content',
      format: 'list',
    },
    {
      endpoint: 'staff',
      format: 'object',
    },
    {
      endpoint: 'contact',
      format: 'object',
    },
    {
      endpoint: 'contact-content',
      format: 'list',
    },
  ],
}

module.exports = config
