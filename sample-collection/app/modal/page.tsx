import BasicModal from '../components/Modal';
import { Typography } from '@mui/material';

const SampleText = () => {
  return (
    <Typography variant="inherit" component="div">
      test
      <br />
      test
      <br />
      test
      <br />
      test
      <br />
      test
      <br />
    </Typography>
  );
};

export default function Page() {
  return <BasicModal button="モーダルを開くボタン" title="ここはタイトル" children={<SampleText />} />;
}
