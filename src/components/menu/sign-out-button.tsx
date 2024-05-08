'use client';

import { signOut } from 'next-auth/react';

import CustomButton from '@/components/shared/button';

const SignOutButton = () => {
  return (
    <CustomButton
      sx={{ maxWidth: '300px', alignSelf: 'flex-end' }}
      size='small'
      variant='text'
      handleClick={() => signOut()}
    >
      Sign out
    </CustomButton>
  );
};

export default SignOutButton;
