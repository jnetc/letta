import fs from 'node:fs'; // 👈 "node:" prefix is an Astro requirement for Node libs
import FetchFromDatoCMS from './datocms';
import type { IData, LanguagesType } from '@Types';

const CACHE_FOLDER = './.cache';
const JSON_FILE = './.cache/local.json';

export default async function LocaleData(lang: LanguagesType) {
  let data;

  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, { recursive: true });
  }

  if (fs.existsSync(JSON_FILE)) {
    // Read data from file
    const raw = fs.readFileSync(JSON_FILE);

    data = JSON.parse(raw as unknown as string);
    return data as IData;
  } else {
    console.info('__________ DATA FROM LOCALE FILE ___________');

    data = await FetchFromDatoCMS(lang);
    // Write projects to "caching" file
    fs.writeFileSync(JSON_FILE, JSON.stringify(data));
    return data;
  }
}
