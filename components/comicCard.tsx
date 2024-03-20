import { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import { Comic } from 'dh-marvel/pages/index.page';
import { useRouter } from 'next/router';

interface ComicCardProps {
    comic: Comic;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
    const [maxLength, setMaxLength] = useState(45);
    const router = useRouter(); // Inicializa el router
    
    useEffect(() => {
        const newMaxLength = window.innerWidth < 600 ? 20 : 45;
        setMaxLength(newMaxLength);
    }, []);
  
    // Función para manejar el click en el botón "Ver detalle"
  const handleViewDetail = () => {
    // Navega a la página de detalles del cómic
    router.push(`/comics/${comic.id}`);
};
const handleComprar = () => {
    router.push(`/checkout/${comic.id}`, // Use template literal to include comic ID in the pathname
);
};
    return (
        <Card sx={{
            maxWidth: 345,
            height: "68vh",
            p: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            '@media (max-width: 600px)': {
                height: "55vh",
            },
        }}>
            <CardMedia
                component="img"
                sx={{ 
                    height: 260, 
                    '@media (max-width: 600px)': {
                        height: 180,
                    },
                }}
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                title={comic.title}
                alt={comic.title}
                style={{ objectFit: 'contain' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: 18 }}>
                    {comic.title.length > maxLength
                        ? `${comic.title.slice(0, maxLength)}...`
                        : comic.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    comic Id: {comic.id}
                </Typography>
            </CardContent>
            <CardActions>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                    {/* Utiliza la función handleViewDetail en el onClick del botón */}
                    <Button variant="contained" color="primary" size="small" sx={{ fontSize: 12 }} onClick={handleViewDetail}>
                        Ver detalle
                    </Button>
                    <Button variant="contained" color="primary" size="small" sx={{ fontSize: 12 }}  onClick={handleComprar}>
                        Comprar
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}

export default ComicCard;
