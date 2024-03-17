import * as React from 'react';
import { FC, PropsWithChildren } from "react";
import Container, { ContainerProps } from "@mui/material/Container"; // Importing Container component and its props from Material-UI
import { Stack, Typography } from "@mui/material"; // Importing Stack and Typography components from Material-UI

// Define props interface for the BodySingle component
interface BodySingleProps extends PropsWithChildren {
    title?: string, // Optional prop for the title
    containerProps?: ContainerProps // Optional props for the Container component
}

// Define the BodySingle component as a functional component
const BodySingle: FC<BodySingleProps> = ({ title, containerProps, children }: BodySingleProps) => {
    return (
        // Container component with maxWidth set to 'xl' and spread containerProps
        <Container maxWidth="xl" {...containerProps}>
            {/* Stack component to vertically stack elements */}
            <Stack  direction={"column"} display={'flex'} justifyContent={'center'}>
                {/* Render the title Typography component if title is provided */}
                {title &&
                    <Typography variant={"h2"} my={2} textAlign={'center'} fontSize={28} fontWeight={600}>
                        {title}
                    </Typography>
                }
                {/* Render children components */}
                {children}
            </Stack>
        </Container>
    );
};


export default BodySingle;
