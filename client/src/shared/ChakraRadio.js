import React, { useState } from 'react'
import { Field } from 'formik'

import { Radio, RadioGroup, Stack, FormControl, FormLabel, FormErrorMessage, FormErrorIcon } from '@chakra-ui/react'

function ChakraRadio(props) {
    // console.log(props);
    const { label, name, options, ...rest } = props
    return (
        <div>
            <Field name={name}>
                {
                    ({ field, form }) => {
                        return (
                            <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired>
                                <FormLabel htmlFor={name} >{label}</FormLabel>

                                <RadioGroup>
                                    <Stack direction="row">
                                        {
                                            options.map(option => {
                                                return <Radio colorScheme="green" {...rest}
                                                    {...field}
                                                    value={option.value}
                                                    w="100px"
                                                    checked={field.value === option.value}>{option.key}</Radio>
                                            })
                                        }

                                    </Stack>
                                </RadioGroup>

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

export default ChakraRadio
