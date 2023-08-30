import type { IData, LanguagesType } from '@Types';

export default async function FetchFromDatoCMS(lang: LanguagesType) {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.DATOCMS_API_KEY}`,
    },
    body: JSON.stringify({
      query: `{
            _site(locale: ${lang}) {
              ...SiteFragment
            }
            navigation(locale: ${lang}) {
              ...NavigationRecordFragment
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
              id
              linkName
            }
          }
        `,
    }),
  });

  const json = (await response.json()) as { data: IData };
  return json.data;
}
