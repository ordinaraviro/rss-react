import "./Main.module.scss";
import CardDetails from "../components/Gallery/CardDetails/CardDetails";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BooksResponse } from "../redux/books";
import Layout from "../components/Layout/Layout";

export default function Main({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout data={data}>
      <CardDetails data={data} />
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  const q = context.query.q || "publish_year%2024";
  const page = context.query.page || "1";
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${q}&page=${page}&limit=10&fields=title,author_name,cover_edition_key,edition_key,first_publish_year,first_sentence,key`,
  );
  const data: BooksResponse = await res.json();
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59",
  );
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: BooksResponse }>;
