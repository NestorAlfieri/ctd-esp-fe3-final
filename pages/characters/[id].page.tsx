import { GetServerSideProps, NextPage } from 'next';
import { getCharacter } from '../../services/marvel/marvel.service';
import { Typography, Grid, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import router from 'next/router';
import Image from 'next/image';

interface CharacterPageProps {
  character: {
    id: number;
    name: string;
    description: string;
    thumbnail: { path: string; extension: string };
    comics: {
      available: number;
      collectionURI: string;
      items: { name: string }[];
    };
    series: {
      available: number;
      collectionURI: string;
      items: { name: string }[];
    };
    stories: {
      available: number;
      collectionURI: string;
      items: { name: string }[];
    };
    urls: { type: string; url: string }[];
  };
}

const handleGoBack = () => {
  router.back(); // Navigate back
};

const CharacterPage: NextPage<CharacterPageProps> = ({ character }) => {
  
 
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <IconButton onClick={handleGoBack}>
          <CancelIcon />
        </IconButton>
      </Grid>
      {/* Image */}
      <Grid item xs={12} md={4}>
        
       <Image width={500} height={500} alt={character.name}
 
  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}

/>
      </Grid>
      {/* Content */}
      <Grid item xs={12} md={8}>
        <div>
          <Typography variant="h2">{character.name}</Typography>
          <Typography variant="body1">{character.description}</Typography>
        </div>
        {/* Grid displaying the first 6 comics */}
        <Grid container spacing={2}>
          {character.comics.items.slice(0, 6).map((comic, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              {/* Render ComicCard component for each comic */}
              {comic.name} 
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
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