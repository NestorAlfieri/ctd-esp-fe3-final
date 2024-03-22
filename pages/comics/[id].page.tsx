import { GetServerSideProps, NextPage } from 'next';
import { getComic } from '../../services/marvel/marvel.service';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import ComicDetails from '../../components/ComicComponents/ComicDetails';
import { ComicDetailsType } from "../../types/types"
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import Head from 'next/head';

const ComicDetailsPage: NextPage<ComicDetailsType> = ({ comic }) => {

  return (

    <LayoutGeneral>
      <Head>
        <title>Marvel Comics</title>
        <meta name="description" content="Explore Marvel comics and characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title={"Detalles del Cómic"}>
        <ComicDetails comic={comic} /> 
      </BodySingle>
    </LayoutGeneral>
  );
};

export const getServerSideProps: GetServerSideProps<ComicDetailsType> = async ({ params }) => {
  const comicId = params?.id as string; 
  const comic = await getComic(parseInt(comicId, 10));
  console.log('Fetched comic:', comic);
  if (!comic) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      comic,
    },
  };
};

export default ComicDetailsPage;
