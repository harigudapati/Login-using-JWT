import React from 'react'
import { Field } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, FormErrorIcon, AlertIcon, Alert, flexbox, PhoneIcon } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react"

function ChakraSwitch(props) {
    const { label, name, ...rest } = props;
    return (
        <div >
            <Field name={name}>
                {
                    ({ field, form }) => {
                        return (
                            <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired>
                                <FormLabel htmlFor={name} >{label}</FormLabel>
                                <Switch id="email-alerts" size="md" />
                            </FormControl>
                        )

                    }
                }
            </Field>
        </div>
    )
}

export default ChakraSwitch
