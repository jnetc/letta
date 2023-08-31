import type { IData, LanguagesType } from '@Types';

export default async function FetchFromDatoCMS(lang: LanguagesType) {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.PUBLIC_DATOCMS_API_KEY}`,
    },
    body: JSON.stringify({
      query: `
          {
            _site(locale: ${lang}) {
              ...SiteFragment
            }

            navigation(locale: ${lang}) {
              ...NavigationRecordFragment
            }

            heroSection(locale: ${lang}) {
              ...HeroSectionRecordFragment
            }
          }

          fragment SiteFragment on Site {
            globalSeo {
              fallbackSeo {
                description
                title
              }
            }
            favicon {
              url
            }
          }

          fragment NavigationRecordFragment on NavigationRecord {
            links {
              anchor
              name
              part
              style
            }
          }

          fragment HeroSectionRecordFragment on HeroSectionRecord {
            name
            style
            title
          }
        `,
    }),
  });

  const json = (await response.json()) as { data: IData };
  return json.data;
}
