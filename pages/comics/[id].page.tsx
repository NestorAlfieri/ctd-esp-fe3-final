import { GetServerSideProps, NextPage } from 'next';
import { Button, Grid, Paper, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material'; // Import close icon
import { useRouter } from 'next/router'; // Import router
import { getComic } from '../../services/marvel/marvel.service'; 
import Link from 'next/link';

interface ComicDetailsProps {
  comic: {
    id: number;
    title: string;
    description: string;
    thumbnail: { path: string; extension: string };
    textObjects: Array<{ text: string }>;
    price: number;
    oldPrice: number;
    stock: number;
    characters: {
      items: { name: string; resourceURI: string }[];
    };
  };
}

const ComicDetails: NextPage<ComicDetailsProps> = ({ comic }) => {
  const router = useRouter(); // Get router object

  const handleBuyClick = () => {
    // Logic for handling comic purchase
  };

  const handleGoBack = () => {
    router.back(); // Navigate back
  };

  return (
    <Paper sx={{ width: "70vw", backgroundColor: "gray", padding: "20px", display: "inline-block" }}>
      <Grid container spacing={2}>
        {/* Close Icon */}
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <IconButton onClick={handleGoBack}>
            <ArrowBack />
          </IconButton>
        </Grid>
        {/* Comic Image */}
        <Grid item xs={12} sm={6}>
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        {/* Comic Info and Buttons */}
        <Grid item xs={12} sm={6} container direction="column" justifyContent="center">
          {/* Comic Title */}
          <Typography variant="h4">{comic.title}</Typography>
          {/* Comic Description */}
          {comic.textObjects.map((textObject, index) => (
  <Typography key={index} variant="body1">
    {textObject.text}
  </Typography>
))}
          {/* Comic Price */}
          <Typography variant="h5">Precio: ${comic.price}</Typography>
          {/* Comic Old Price */}
          {comic.oldPrice !== comic.price && (
            <Typography variant="body2">Precio Anterior: ${comic.oldPrice}</Typography>
          )}
         {/* List of characters */}
         <Typography variant="h6">Personajes:</Typography>
          {comic.characters.items.map((character, index) => (
            <Typography key={index} variant="body2">
              <Link href={`/characters/${character.resourceURI.split('/').pop()}`} passHref>
                <a>{character.name}</a>
              </Link>
            </Typography>
          ))}
          {/* Buy Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleBuyClick}
            disabled={comic.stock === 0}
            style={{ marginTop: '10px' }}
          >
            {comic.stock > 0 ? 'Comprar' : 'Sin stock disponible'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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

export default ComicDetails;
