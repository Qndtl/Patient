import React from 'react';
import { Chart } from 'react-google-charts';
import styled from 'styled-components';
import { Container } from './RaceChart';

const SChart = styled(Chart)`
  width: 400px;
  height: 400px;
  @media screen and (max-width: 400px){
    width: 100%;
  }
`;

export default function GRChart({ stats, gender, race }) {
  const getNumber = (myGender, filterGender, myRace) => {
    return gender === myGender || (race !== myRace && race !== null && race !== "") ? 0 : stats?.filter(stat => stat.gender === filterGender && stat.race === myRace).map(stat => stat.count).reduce((sum, curV) => sum += curV);
  }
  return (
    <Container>
      <SChart
        chartType="PieChart"
        loader={<div>Loading</div>}
        data={[
          ["Gender & Race", "Count"],
          ["Female + other", getNumber("M", "F", "other")],
          ["Male + native", getNumber("F", "M", "native")],
          ["Female + native", getNumber("M", "F", "native")],
          ["Male + black", getNumber("F", "M", "black")],
          ["Female + black", getNumber("M", "F", "black")],
          ["Male + white", getNumber("F", "M", "white")],
          ["Female + white", getNumber("M", "F", "white")],
          ["Male + asian", getNumber("F", "M", "asian")],
          ["Female + asian", getNumber("M", "F", "asian")],
        ]}
        options={{
          title: "성별 + 인종별 환자 수",
          titleTextStyle: {
            fontSize: 22
          }
        }} />
    </Container>
  )
}