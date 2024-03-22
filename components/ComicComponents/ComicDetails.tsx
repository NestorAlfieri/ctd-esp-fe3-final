import { Button, Grid, Paper, Typography, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {ComicDetailsType} from "../../types/types"

const ComicDetails: NextPage<ComicDetailsType> = ({ comic }) => {
  const router = useRouter(); 

  const handleBuyClick = () => {
    router.push(`/checkout/${comic.id}`,)    
  };

  const handleGoBack = () => {
    router.back(); 
  };

  return (
    <Paper sx={{ width: '70vw', backgroundColor: 'gray', padding: '20px', display: 'inline-block' }}>
      <Grid container spacing={2}>
        {/* Close Icon */}
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <IconButton onClick={handleGoBack}>
            <CancelIcon />
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
          {comic.textObjects && comic.textObjects.map((textObject, index) => (
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
          {comic.characters && comic.characters.items.map((character, index) => (
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

export default ComicDetails;
