import { GetServerSideProps, NextPage } from "next";
import CheckoutForm from "../../components/CheckoutComponents/checkoutForm"
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { ComicDetailsType } from "types/types";

const Checkout: NextPage<ComicDetailsType> = ({ comic }) => {

  return (
    <LayoutCheckout>
      <CheckoutForm comic={comic} />
    </LayoutCheckout>
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