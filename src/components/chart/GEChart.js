import React from 'react';
import { Chart } from 'react-google-charts';
import { Container } from './RaceChart'
import styled from 'styled-components';

const SChart = styled(Chart)`
  width: 400px;
  height: 400px;
  @media screen and (max-width: 400px){
    width: 100%;
  }
`;

export default function GEChart({ stats, gender, ethnicity }) {
  const getNumber = (gen, filtGen, ethn, filtEthn) => {
    return gender === gen || ethnicity === ethn ? 0 : stats?.filter(stat => stat.gender === filtGen && stat.ethnicity === filtEthn).map(stat => stat.count).reduce((sum, curV) => sum += curV)
  }
  return (
    <Container>
      <SChart
        chartType="PieChart"
        loader={<div>Loading</div>}
        data={[
          ["Gender & Ethnicity", "Count"],
          ["Male & Hispanic", getNumber('F', 'M', 'nonhispanic', 'hispanic')],
          ["Male & Non-hispanic", getNumber('F', 'M', 'hispanic', 'nonhispanic')],
          ["Female & Hispanic", getNumber('M', 'F', 'nonhispanic', 'hispanic')],
          ["Female & Non-hispanic", getNumber('M', 'F', 'hispanic', 'nonhispanic')]
        ]}
        options={{
          title: "민족별 환자 수",
          titleTextStyle: {
            fontSize: 22
          }
        }} />
    </Container>
  )
}