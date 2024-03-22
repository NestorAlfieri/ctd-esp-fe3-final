import { GetServerSideProps, NextPage } from 'next';
import { getCharacter } from '../../services/marvel/marvel.service';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { CharacterPageProps } from 'types/types';
import CharacterDetails from 'dh-marvel/components/CharacterComponents/CharacterDetails';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import Head from 'next/head';

const CharacterPage: NextPage<CharacterPageProps> = ({ character }) => {

  return (
    <LayoutGeneral>
      <Head>
        <title>Marvel Comics</title>
        <meta name="description" content="Explore Marvel comics and characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title={"Detalles del Personaje"}>
        <CharacterDetails character={character} />
      </BodySingle>
    </LayoutGeneral>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characterId = params?.id as string;
  const character = await getCharacter(parseInt(characterId, 10));
  console.log('Fetched character:', character);
  if (!character) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;