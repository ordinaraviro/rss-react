import Layout from '@/components/Layout/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books Api App',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { page = 'page', q = 'q' } = await searchParams;
  const fetchPage = Number(page) ? page : '1';
  const fetchQueary = q || 'publish_year%2024';

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(fetchQueary)}&page=${fetchPage}&limit=10&fields=title,author_name,cover_edition_key,edition_key,first_publish_year,first_sentence,key`,
    { cache: 'no-store' }
  );

  const data = await res.json();
  return <Layout data={data}>{''}</Layout>;
}
