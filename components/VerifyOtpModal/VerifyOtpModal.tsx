import * as React  from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useState , FC, ReactElement} from 'react';
import { SelectElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutation, useFormPersist } from '@graphcommerce/react-hook-form'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from '../../graphql/SignUp.gql'
import MailLockIcon from '@mui/icons-material/MailLock';
import CloseIcon from '@mui/icons-material/Close';

import { Box, CircularProgress, Link, SxProps, Theme, Typography } from '@mui/material'
export default function VerifyOtpModal({open ,onClose}) {
  // const [isopen, setOpen] = useState(open);
  const Mutation = SignUpDocument
  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(
    Mutation,
  )
  const {  required, control } = form
  const handleClose = () => {
    onClose(false);
  };
console.log('taha', open)
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries((formData as any).entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleClose();
        //   },
        // }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' ,alignItems: 'flex-start' }}>
        <MailLockIcon 
        color="primary"
        fontSize="large"
        
        />
        <Button 
        onClick={handleClose}
        >
          <CloseIcon/>
          </Button>
        </Box>
        {/* <Box> </Box> */}
        <DialogContent>
          <DialogContentText sx={{ color: '#1E1E1E' }}>
            Please check your sms message
          </DialogContentText>
          <TextFieldElement
          sx={{ color: '#7B7777' }}
            control={form.control}
            required
            fullWidth
            placeholder='otp message'
            id="name"
            name="email"
            type="email"

          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button 
          type="submit"
          id='verify-otp'
          variant="contained" 
          color='primary'
          size='large'
          sx={{
            borderRadius: 2,
            width: 240,
            backgroundColor: "#484848",
            color: "#fff", 
            "&:hover": {
              backgroundColor: "#B08443",
            },
          }}
          >
            Verify
          </Button>
        </DialogActions>
        <Link href='/'> Resend otp </Link>
      </Dialog>
    // </React.Fragment>
  );
}
