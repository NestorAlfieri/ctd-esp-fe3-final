import {render, screen} from "@testing-library/react";
import IndexPage from "dh-marvel/pages/index.page";
import Index from "dh-marvel/pages/index.page";

describe('IndexPage', () => {
    describe('when rendering default', () => {
        it('should render the title', () => {
            render(<Index comics={[]}/>)
            const title = screen.getByText('Cómics de Marvel')
            expect(title).toBeInTheDocument()
        })
    })

})