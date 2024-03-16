import { NextPage } from 'next';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import { FaqsType } from './faqsData';

interface FaqsPageProps {
  faqs: FaqsType[];
}

const Faqs: NextPage<FaqsPageProps> = ({ faqs }) => (
  <div>
    {faqs.map((faq) => (
      <Accordion key={faq.id}>
        <AccordionSummary>
          <Typography>{faq.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{faq.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
);

export default Faqs;

