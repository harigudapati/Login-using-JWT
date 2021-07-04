import React from 'react'
import { Field } from 'formik';
import { PinInput, PinInputField, HStack } from "@chakra-ui/react"
import { Input, FormControl, FormLabel, FormErrorMessage, FormErrorIcon, AlertIcon, Alert, flexbox, PhoneIcon } from "@chakra-ui/react";

function ChakraPin(props) {
    const { label, name, ...rest } = props;
    return (
        <div >
            <Field name={name}>
                {
                    ({ field, form }) => {
                        return (
                            <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired>
                                <FormLabel htmlFor={name} >{label}</FormLabel>

                                <HStack>
                                    <PinInput>
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </HStack>

                                    {/* <FormErrorIcon style={{ color: "red" }} /> */}
                                    <FormErrorMessage> {form.errors[name]}</FormErrorMessage>

                            </FormControl>
                        )

                    }
                }
            </Field>
        </div>
    )
}

export default ChakraPin
