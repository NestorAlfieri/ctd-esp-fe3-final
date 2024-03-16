import Faqs from "../components/faqs/Faqs"
;
import { FaqsType, faqsData } from "../components/faqs/faqsData";

export default function FaqsPage({ faqs }: { faqs: FaqsType[] }) {
    return (
        <div>
            <Faqs faqs={faqs} />
        </div>
    );
}

export async function getStaticProps() {
    // Obtener los datos de preguntas frecuentes
    const faqs = faqsData;

    // Devolver los datos como props
    return {
        props: {
            faqs,
        },
    };
}
