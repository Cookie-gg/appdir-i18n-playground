'use client';

import { Locale } from '#/lib/i18n';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  lang: Locale;
}

export const LangButton: React.FC<Props> = ({ lang }) => {
  const pathname = usePathname();

  return (
    <Link
      href={`/${lang === 'ja' ? 'en' : 'ja'}/${pathname
        ?.split('/')
        .slice(2)
        .join('/')}`}
      className="text-gray-400"
    >
      {lang === 'ja' ? 'En' : 'あ'}
    </Link>
  );
};
