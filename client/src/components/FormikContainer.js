import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import FormikControl from './FormikControl'
import { Button } from "@chakra-ui/react"

function FormikContainer(props) {


    const dropdownOption = [
        { key: 'Select a Fav color', value: '' },
        { key: 'Red', value: 'option1' },
        { key: 'Black', value: 'option2' },
        { key: 'Yellow', value: 'option3' }
    ]
    const radioOption = [
        { key: 'New York', value: '1' },
        { key: 'Singapore', value: '2' },
        { key: 'India', value: '3' }
    ]
    const checkOption = [
        { key: 'Option 1', value: 'coption1' },
        { key: 'Option 2', value: 'coption2' },
        { key: 'Option 3', value: 'coption3' }
    ]
    const initialValues = {
        email: '',
        password: '',
        description: '',
        radioOption: '',
        checkOption: [],
        dropdownOption:''
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email Format').required('Field is Required'),
        password: Yup.string().required('Field is Required'),
        description: Yup.string().required("Field is required"),
        dropdownOption: Yup.string().required("Field is required")

    })


    const onSubmitFun = (values) => console.log('Form Data', values);

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitFun}
        >
            {
                formik => {

                    console.log('Formik Data', formik);
                    return (
                        <div >
                            <Form>
                               
                                    <FormikControl
                                        control='chakrainput'
                                        name='email'
                                        label='Email:'
                                        type='email'
                                        req={true}

                                    />
                                    <FormikControl
                                        control='chakrainput'
                                        name='password'
                                        label='Password:'
                                        type='password'
                                        req={true}
                                    />


                                    <FormikControl
                                        control='chakratextarea'
                                        name='description'
                                        label='Description:'
                                        type='description'
                                    />

                                    <FormikControl
                                        control='chakraselect'
                                        label='select a Fav Color:'
                                        name='dropdownOption'
                                        options={dropdownOption}
                                        req={true}
                                    />

                                    <FormikControl
                                        control='chakraradio'
                                        label='select a City:'
                                        name='radioOption'
                                        options={radioOption}
                                        req={true}
                                    />

                                    <FormikControl
                                        control='chakracheckbox'
                                        label='select a City:'
                                        name='checkOption'
                                        options={checkOption}
                                        req={true}
                                    />

                                    <FormikControl
                                        control='editable'
                                        label='You can edit the changes:'
                                        name='Edit'
                                        req={true}
                                    />

                                    <FormikControl
                                        control='chakrapin'
                                        label='Enter you Card PIN:'
                                        name='pininput'
                                        req={true}
                                    />

                                    <FormikControl
                                        control='switching'
                                        label=' Enable email alerts?'
                                        name='switching'
                                    />


                                {/* </Grid> */}
                               




                                <Button type='reset' colorScheme="teal" size="sm" > Reset</Button>

                                <Button type='submit' colorScheme="teal" size="sm" ml="6px">
                                    Submit
                                 </Button>


                            </Form>

                        </div>

                    )
                }
            }
        </Formik>
    )
}

export default FormikContainer
