export type LanguagesType = 'fi' | 'en';
export type IDType = { id: string };
export type NameType = { name: string };
export type UrlType = { url: string };
export type HandlerType = { handler: () => void };

export interface IArticle {
  title: string;
  description: string;
}

export interface INavigation {
  links: Array<{ anchor: string; id: string; linkName: string }>;
}

interface IFavicon {
  image: { url: string };
}
interface ISEO {
  globalSeo: {
    fallbackSeo: IArticle & IFavicon;
  };
}

export interface IData {
  _site: ISEO;
  navigation: INavigation;
}