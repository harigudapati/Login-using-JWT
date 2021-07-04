
import React from 'react'
import { Field } from "formik";
import { Textarea, FormControl, FormLabel, FormErrorMessage, FormErrorIcon } from "@chakra-ui/react";

function ChakraTextArea(props) {
    const { label, name, ...rest } = props;
    return (
        <div >
            <Field name={name}>
                {
                    ({ field, form }) => {

                        // console.log(field);
                        // console.log(form);
                        return (
                            <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired >
                                <FormLabel htmlFor={name}>{label} </FormLabel>
                                <Textarea id={name} {...rest} {...field} />

                                {/* <FormErrorIcon  style={{color:"red"}}/> */}
                                <FormErrorMessage>{form.errors[name]} </FormErrorMessage>

                            </FormControl>
                        )
                    }
                }

            </Field>

        </div>
    )
}

export default ChakraTextArea
