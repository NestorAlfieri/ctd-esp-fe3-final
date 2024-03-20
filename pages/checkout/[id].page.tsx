import { GetServerSideProps, NextPage } from "next";
import CheckoutForm from "../../components/CheckoutComponents/checkoutForm"
import { getComic } from "dh-marvel/services/marvel/marvel.service";

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
const Checkout: NextPage<ComicDetailsProps> = ({ comic }) => {

    return(

        <CheckoutForm comic={comic}/>
    )
}
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
export default Checkout;