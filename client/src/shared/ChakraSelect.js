import React from 'react'
import { Field } from 'formik';
import { Select, FormControl, FormLabel, FormErrorMessage} from "@chakra-ui/react";

function ChakraSelect(props) {
    const { label, name, options, ...rest } = props;
    return (
        <div >
            <Field name={name}>
                {
                    ({ field, form }) => {
                        return (
                            <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired>
                                <FormLabel htmlFor={name} >{label}</FormLabel>

                                <Select id={name} {...rest} {...field} w="400px" >
                                    {

                                        options.map(option => {
                                            return (
                                                <option value={option.value}>{option.key}</option>
                                            )
                                        })
                                    }
                                </Select>

                                {/* <FormErrorIcon  style={{color:"red"}}/> */}
                                <FormErrorMessage> {form.errors[name]}</FormErrorMessage>

                            </FormControl>
                        )

                    }
                }
            </Field>
        </div>
    )
}

export default ChakraSelect
