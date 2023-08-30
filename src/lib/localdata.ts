import type { IData, LanguagesType } from '@Types';
import fs from 'node:fs'; // 👈 "node:" prefix is an Astro requirement for Node libs

import FetchFromDatoCMS from './datocms';

export default async function LocaleData(lang: LanguagesType) {
  const cache = './.cache';
  let data;

  if (!fs.existsSync(cache)) {
    fs.mkdirSync(cache, { recursive: true });
  }

  if (fs.existsSync('./.cache/local.json')) {
    // Read data from file
    const raw = fs.readFileSync('./.cache/local.json');

    data = JSON.parse(raw as unknown as string);
    return data as IData;
  } else {
    console.info('__________ data from locale file ___________');

    data = await FetchFromDatoCMS(lang);
    // Write projects to "caching" file
    fs.writeFileSync('./.cache/local.json', JSON.stringify(data));
    return data;
  }
}
