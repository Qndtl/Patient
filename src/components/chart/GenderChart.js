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

export default function GenderChart({ stats, gender }) {
  return (
    <Container>
      <SChart
        chartType="PieChart"
        loader={<div>Loading</div>}
        data={[
          ["Gender", "Count"],
          ["Male", gender !== "F" ?
            stats?.filter(stat => stat.gender === "M").map(stat => stat.count).reduce((sum, curV) => sum += curV) : 0],
          ["Female", gender !== "M" ?
            stats?.filter(stat => stat.gender === "F").map(stat => stat.count).reduce((sum, curV) => sum += curV) : 0]
        ]}
        options={{
          title: "성별 환자 수",
          titleTextStyle: {
            fontSize: 22
          }
        }} />
    </Container>
  )
}