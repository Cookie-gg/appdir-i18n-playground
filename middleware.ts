import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './lib/i18n';
import { match as matchLocale } from '@formatjs/intl-localematcher';

const getLocale = (req: NextRequest) => {
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let langs = new Negotiator({ headers: negotiatorHeaders }).languages();

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  return matchLocale(langs, locales, i18n.defaultLocale);
};

export const middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith('/_next')) return;

  const pathname = req.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }
};
