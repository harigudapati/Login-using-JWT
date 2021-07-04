import React from 'react'
import ChakraInput from "../shared/ChakraInput";
import ChakraTextArea from '../shared\/ChakraTextArea';
import ChakraSelect from "../shared/ChakraSelect";
import ChakraRadio from '../shared/ChakraRadio';
import ChakraCheckbox from "../shared/ChakraCheckbox";
import Editable from "../shared/Editable";
import ChakraPin from "../shared/ChakraPin";
import Switching from "../shared/Switching";


function FormikControl(props) {
    const { control, ...rest } = props
    switch (control) {

        case 'chakrainput': 
        return <ChakraInput {...rest} />
        case 'chakratextarea':
            return <ChakraTextArea {...rest}/>

            case 'chakraselect':
            return <ChakraSelect {...rest}/>

           case 'chakraradio':
               return <ChakraRadio {...rest}/>

               case 'chakracheckbox':
               return <ChakraCheckbox {...rest}/>

               case 'editable':
                   return <Editable {...rest}/>

                   case 'chakrapin':
                 return <ChakraPin {...rest}/>
            
case 'switching':
    return <Switching {...rest}/>

        default: return null
    }

}

export default FormikControl
