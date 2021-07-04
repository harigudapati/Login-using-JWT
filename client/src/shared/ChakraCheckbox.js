import React, { useState } from 'react'
import { Field } from 'formik'
import { Checkbox, CheckboxGroup, Stack, FormControl, FormLabel, FormErrorMessage, FormErrorIcon } from '@chakra-ui/react'

function ChakraCheckbox(props) {
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
                                {

                                    <CheckboxGroup >
                                        <Stack direction="row">
                                            {
                                                options.map(option => {
                                                    return <Checkbox colorScheme="green" {...rest}
                                                        {...field}
                                                        value={option.value}
                                                        w="100px"
                                                        // checked={field.value.includes(option.value)}
                                                        checked={field.value === option.value}>{option.key}</Checkbox>
                                                })
                                            }

                                        </Stack>
                                    </CheckboxGroup>

                                }

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

export default ChakraCheckbox
