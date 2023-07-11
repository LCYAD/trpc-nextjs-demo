import Head from 'next/head';

import Box from '@mui/system/Box';
import styled from '@mui/system/styled';
import DataTable from '@/components/DataTable';
import DataInput from '@/components/DataInput';

export default function Home() {
  const MainContainer = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  });

  const StyledBox = styled(Box)({
    border: '1px solid black',
    borderRadius: '5%',
    padding: 20,
    margin: '10px 0px',
  });

  return (
    <MainContainer>
      <Head>
        <title>Just a normal TPRC demo</title>
        <meta name="description" content="Just a normal TPRC demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledBox sx={{ height: 350, width: 600 }}>
        <DataTable />
      </StyledBox>
      <StyledBox sx={{ height: 300, width: 400 }}>
        <DataInput />
      </StyledBox>
    </MainContainer>
  );
}
