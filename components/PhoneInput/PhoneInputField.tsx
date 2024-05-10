import { FormRow, InputCheckmark } from '@graphcommerce/next-ui'
import { PhoneInput } from 'react-international-phone';
import { assertFormGqlOperation, UseFormReturn } from '@graphcommerce/react-hook-form'
import 'react-international-phone/style.css';
import { Controller, ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { useState } from "react";



type PhoneInputFieldValues = {
  mobile?: string
}
type PhoneInputFieldProps = {
  form: UseFormReturn<any>
}


export function PhoneInputField(props: PhoneInputFieldProps) {
  const {form} = props
  assertFormGqlOperation<PhoneInputFieldValues>(form)

  const { control, required } = form
  const [phone, setPhone] = useState('');
  
  const validatePhone = (value) => {

    console.log(value.length);
  
    if (value.length < 13) { 
       console.log('Invalid phone number format');
      return 'Invalid phone number format'; 
    
    }
  
    return true; 
  };
  return (
    <>
      <FormRow>
      <Controller
        control={form.control}
        name="mobile"
        rules={{
          required: {
            value: true,
            message: "Mobile number is required",
            
          },
          validate: validatePhone,
          
          
        }}
        render={({ field: { onChange, value } }) => ( 
      <PhoneInput
        required={required.mobile}
        defaultCountry="sa"
        value={value}
        onChange={(newValue) => onChange(newValue)}
        hideDropdown = {true}
        forceDialCode = {true}
        defaultMask = {"........."}
      />
       )}
      /> 
      </FormRow>
    </>
  )
}
