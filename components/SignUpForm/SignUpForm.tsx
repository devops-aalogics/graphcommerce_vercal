import * as React from 'react';
import { PasswordRepeatElement } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, FormActions, FormRow, InputCheckmark } from '@graphcommerce/next-ui'
import { useFormGqlMutation, useFormPersist } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Alert, FormControlLabel, Switch} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import { ApolloCustomerErrorSnackbar } from '@graphcommerce/magento-customer/components/ApolloCustomerError/ApolloCustomerErrorSnackbar'
import { NameFields } from '../NameFields/NameFields'
import { ValidatedPasswordElement } from '@graphcommerce/magento-customer/components/ValidatedPasswordElement/ValidatedPasswordElement'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from '../../graphql/SignUp.gql'
import { SignUpConfirmDocument } from '../../graphql/SignUpConfirm.gql'
import { SelectElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { useState } from "react";
import { PhoneInputField } from '../PhoneInput/PhoneInputField';
import  { Dayjs } from 'dayjs';
import  dayjs from 'dayjs';
import { Controller, ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import VerifyOtpModal from '../VerifyOtpModal/VerifyOtpModal';



type SignUpFormProps = { email: string }

const requireEmailValidation = import.meta.graphCommerce.customerRequireEmailConfirmation ?? false

export function SignUpForm(props: SignUpFormProps) {
  const { email } = props

  const Mutation = requireEmailValidation ? SignUpConfirmDocument : SignUpDocument

  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(
    Mutation,
    {
      defaultValues: { email },
      onBeforeSubmit: (values) => ({ ...values, email }),
      experimental_useV2: true,
    },
    { errorPolicy: 'all' },
  )

  const { muiRegister, handleSubmit, required, formState, error, control } = form
  const [selectedValue, setSelectedValue] = useState('Select Gender');
  const [remainingError, inputError] = graphqlErrorByCategory({ category: 'graphql-input', error })
 
  const submitHandler = handleSubmit(() => {
    // if(form.formState.isSubmitting){
      handleClickOpen();
    // }
  
  })
  const handleChange = (event) => {
     setSelectedValue(event);
  };
  const genders = [
    { id: 0,label:'' },
    { id: 1, label: 'Male' },
    { id: 2, label: 'Female' }
  ];
  const [phone, setPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  useFormPersist({ form, name: 'SignUp', exclude: ['password', 'confirmPassword'] })

  const handleClickOpen = () => {
      setShowModal(true); 
  };

  if (requireEmailValidation && form.formState.isSubmitSuccessful) {
    return (
      <Alert>
        <Trans id='Please check your inbox to validate your email ({email})' values={{ email }} />
      </Alert>
    )
  }

  return (
    <form onSubmit={submitHandler} noValidate>
      
      <NameFields form={form} />

      <FormRow>
        <SelectElement
          control={form.control}
          name="gender"
          variant='outlined'
          label={<Trans id='Gender' />}
          value={selectedValue ?? ''} 
          onChange={handleChange}
          options={genders}>
        </SelectElement>
      </FormRow>
      <FormRow>
        
      <Controller
        control={form.control}
        name="dateOfBirth"
        render={({ field: { onChange, value, ref } }) => (       
            <DatePicker
              label="Date Of Birth"
              onChange={(newValue) => onChange(dayjs(newValue).format('YYYY-MM-DD'))}
              onAccept={(newValue) => onChange(dayjs(newValue).format('YYYY-MM-DD'))}
              value={value ? dayjs(dayjs(value).hour(5).format('YYYY-MM-DD')): null}
              inputRef={ref}
            />
        
        )}
      />
      <PhoneInputField form={form}/>
      </FormRow>

      <ApolloCustomerErrorSnackbar error={remainingError} />

      <FormActions>
        <Button
          type='submit'
          id='create-account'
          variant='pill'
          color='primary'
          size='large'
          loading={formState.isSubmitting}
        >
          <Trans id='Create Account' />
        </Button>
      </FormActions>

      <VerifyOtpModal open={showModal} onClose={setShowModal} />
    </form>
    
  )
}
