import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box, Button, Typography, TextField, Stepper, Step, StepLabel } from '@mui/material';
import { useRouter } from 'next/router';
export interface Comic {
    id: number;
    title: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    price:number;
}
export type CheckoutInput = {
    customer: {
        name: string,
        lastname: string,
        email: string
        address: {
            address1: string,
            address2: string | null,
            city: string,
            state: string,
            zipCode: string
        }
    },
    card: {
        number: string,
        cvc: string,
        expDate: string,
        nameOnCard: string
    },
    order: {
        name: string;
        image: string;
        price: number;
    }
}

const CheckoutForm = ({ comic }: { comic: Comic }) => {
    const { handleSubmit, control, formState: { errors } } = useForm<CheckoutInput>();
    const router = useRouter();    
    const { comicId } = router.query; // Retrieve comic data from query parameters
    const onSubmit: SubmitHandler<CheckoutInput> = (data) => {
        // Lógica para enviar el formulario
       
    };
    console.log(comic);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
             <Typography variant="h6">Checkout</Typography>
           
                <Box mt={2}>
                    <Typography variant="body1">Comic ID: {comic.id}</Typography>
                    
                </Box>
            
            <Stepper activeStep={0} alternativeLabel>
                <Step>
                    <StepLabel>Datos Personales</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Dirección de Entrega</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Datos del Pago</StepLabel>
                </Step>
            </Stepper>

            <Box className='formStep' mt={2}>
                {/* Datos Personales */}
                <Typography variant="h6">Datos Personales</Typography>
                <Box className='fieldsContainer' mt={2}>
                    <Controller                    
                        name="customer.name"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Nombre" error={!!errors.customer?.name} helperText={errors.customer?.name ? "Campo requerido" : ""} />
                        )}
                    />
                    <Controller
                        name="customer.lastname"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Apellido" error={!!errors.customer?.lastname} helperText={errors.customer?.lastname ? "Campo requerido" : ""} />
                        )}
                    />
                    <Controller
                        name="customer.email"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Email" error={!!errors.customer?.email} helperText={errors.customer?.email ? "Campo requerido" : ""} />
                        )}
                    />
                    {/* Otros campos de datos personales */}
                </Box>
            </Box>

            <Box className='formStep' mt={2}>
                {/* Dirección de Entrega */}
                <Typography variant="h6">Dirección de Entrega</Typography>
                <Box className='fieldsContainer' mt={2}>
                    <Controller
                        name="customer.address.address1"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Dirección" error={!!errors.customer?.address?.address1} helperText={errors.customer?.address?.address1 ? "Campo requerido" : ""} />
                        )}
                    />
                    <Controller
                        name="customer.address.address2"
                        control={control}
                        defaultValue=""
                        rules={{ required: false }}
                        render={({ field }) => (
                            <TextField {...field} label="Departamento" error={!!errors.customer?.address?.address2} helperText={errors.customer?.address?.address2 ? "Campo opcional" : ""} />
                        )}
                    />
                    <Controller
                        name="customer.address.city"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Ciudad" error={!!errors.customer?.address?.city} helperText={errors.customer?.address?.city ? "Campo requerido" : ""} />
                        )}
                    />
                    <Controller
                        name="customer.address.state"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Provincia" error={!!errors.customer?.address?.state} helperText={errors.customer?.address?.state ? "Campo requerido" : ""} />
                        )}
                    />
                    <Controller
                        name="customer.address.zipCode"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Código Postal" error={!!errors.customer?.address?.zipCode} helperText={errors.customer?.address?.zipCode ? "Campo requerido" : ""} />
                        )}
                    />
                </Box>
            </Box>
            <Box className='formStep' mt={2}>
                {/* Datos del Pago */}
                <Typography variant="h6">Datos del Pago</Typography>
                <Box className='fieldsContainer' mt={2}>
                <Controller
                        name="order.price" // Assuming this is where you want to display the price
                        control={control}
                        defaultValue={comic?.price} // Use the comic order price as the default value
                        render={({ field }) => (
                            <TextField {...field} label="Precio del cómic" disabled />
                        )}
                    />
                    <Controller
                        name="card.number"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Número de Tarjeta" error={!!errors.card?.number} helperText={errors.card?.number ? "Campo requerido" : ""} />
                        )}
                    />
                    <Controller
                        name="card.nameOnCard"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Nombre del titular" error={!!errors.card?.nameOnCard} helperText={errors.card?.nameOnCard ? "Campo requerido" : ""} />
                        )}
                    />
                    <Controller
                        name="card.expDate"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Fecha de expiración" error={!!errors.card?.expDate} helperText={errors.card?.expDate ? "Campo requerido" : ""} />
                        )}
                    />
                    <Controller
                        name="card.cvc"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} label="Código de seguridad" error={!!errors.card?.cvc} helperText={errors.card?.cvc ? "Campo requerido" : ""} />
                        )}
                    />
                    {/* Otros campos de datos del pago */}
                </Box>
            </Box>

            <Button type="submit" variant="contained" color="primary">Enviar</Button>
        </form>
    );
};
export default CheckoutForm;
