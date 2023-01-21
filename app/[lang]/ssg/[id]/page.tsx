import { i18n, Locale } from '#/lib/i18n';

export async function generateStaticParams() {
  const ids = [{ id: '1', lang: 'ja' }, { id: '2' }, { id: '3' }, { id: '4' }];
  return i18n.locales
    .map((lang) => ids.map((elem) => ({ lang, ...elem })))
    .flat();
}

async function fetchData(params: { id: string }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
  );
  const data = await res.json();
  return data;
}

export default async function Page({
  params,
}: {
  params?: any;
  children?: React.ReactNode;
}) {
  console.log(params);
  const data = await fetchData(params);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium text-gray-100">{data.title}</h1>
      <p className="font-medium text-gray-400">{data.body}</p>
    </div>
  );
}
