import { render, screen } from '@testing-library/react';
import Faqs from '../components/faqs/Faqs'; // Asegúrate de que la ruta sea correcta

describe('Faqs', () => {
    describe('when rendering', () => {
        it('should render the questions and answers', () => {
            // Mock data
            const faqsData = [
                { id: 1, question: 'Question 1', answer: 'Answer 1' },
                { id: 2, question: 'Question 2', answer: 'Answer 2' },
            ];

            render(<Faqs faqs={faqsData} />);
            
            // Verifica que las preguntas y respuestas se rendericen correctamente
            expect(screen.getByText('Question 1')).toBeInTheDocument();
            expect(screen.getByText('Answer 1')).toBeInTheDocument();
            expect(screen.getByText('Question 2')).toBeInTheDocument();
            expect(screen.getByText('Answer 2')).toBeInTheDocument();
        });
    });
});
