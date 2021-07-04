import React from 'react'
import { Field } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, FormErrorIcon } from "@chakra-ui/react";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

function ChakraEdit(props) {
    const { label, name, ...rest } = props;
    return (
        <div >
            <Field name={name}>
                {
                    ({ field, form }) => {
                        return (
                            <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired>
                                <FormLabel htmlFor={name} >{label}</FormLabel>

                                <Editable defaultValue="Take some chakra" id={name} {...rest} {...field} w="400px" borderColor="black">
                                    <EditablePreview />
                                    <EditableInput borderColor="black" />
                                </Editable>

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

export default ChakraEdit
