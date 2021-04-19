import React from 'react';
import { Chart } from 'react-google-charts';
import { Container } from './RaceChart'
import styled from 'styled-components';

const SChart = styled(Chart)`
  width: 400px;
  height: 400px;
  background-color: blue;
  @media screen and (max-width: 400px){
    width: 100%;
  }
`;

export default function EthnicityChart({ stats, ethnicity }) {
  return (
    <Container>
      <SChart
        chartType="PieChart"
        loader={<div>Loading</div>}
        data={[
          ["Ethnicity", "Count"],
          ["Hispanic", ethnicity !== "nonhispanic" ?
            stats?.filter(stat => stat.ethnicity === "hispanic").map(stat => stat.count).reduce((sum, curV) => sum += curV) : 0],
          ["Non-hispanic", ethnicity !== "hispanic" ?
            stats?.filter(stat => stat.ethnicity === "nonhispanic").map(stat => stat.count).reduce((sum, curV) => sum += curV) : 0]
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