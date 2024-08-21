import { Typography, Link as MuiLink } from '@mui/material';

import Link from 'next/link';

export default function Home() {
  return (
    <MuiLink component={Link} href="/helloworld" underline="none">
      <Typography variant="h5" component="div">
        helloworld
      </Typography>
    </MuiLink>
  );
}
