import { i18n } from '#/lib/i18n';

export const dynamicParams = true;

export async function generateStaticParams() {
  const ids = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
  return i18n.locales
    .map((lang) => ids.map((elem) => ({ lang, ...elem })))
    .flat();
}

async function fetchData(params: { id: string }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { next: { revalidate: 15 } },
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
  const data = await fetchData(params);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium text-gray-100">{data.title}</h1>
      <p className="font-medium text-gray-400">{data.body}</p>
    </div>
  );
}
