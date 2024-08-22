import { Typography, Link as MuiLink } from '@mui/material';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <MuiLink component={Link} href="/helloworld" underline="none">
        <Typography variant="inherit" component="div">
          helloworld
        </Typography>
      </MuiLink>
      <MuiLink component={Link} href="/counter" underline="none">
        <Typography variant="inherit" component="div">
          counter
        </Typography>
      </MuiLink>
      <MuiLink component={Link} href="/todo" underline="none">
        <Typography variant="inherit" component="div">
          todo
        </Typography>
      </MuiLink>
    </>
  );
}
