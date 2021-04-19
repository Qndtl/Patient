import React from 'react';
import { Chart } from 'react-google-charts';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin: 0px;
  }
`;

const SChart = styled(Chart)`
  width: 400px;
  height: 400px;
  @media screen and (max-width: 400px){
    width: 100%;
  }
`;

export default function RaceChart({ stats, race }) {
  const getNumber = (raceCon) => {
    return race === null || race === "" || race === raceCon ? stats?.filter(stat => stat.race === raceCon).map(stat => stat.count).reduce((sum, curV) => sum += curV) : 0
  }
  return (
    <Container>
      <SChart
        chartType="PieChart"
        loader={<div>Loading</div>}
        data={[
          ["Race", "Count"],
          ["Other", getNumber("other")],
          ["Native", getNumber("native")],
          ["Black", getNumber("black")],
          ["White", getNumber("white")],
          ["Asian", getNumber("asian")],
        ]}
        options={{
          title: "인종별 환자 수",
          titleTextStyle: {
            fontSize: 22
          }
        }} />
    </Container>
  )
}