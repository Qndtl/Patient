import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import styled from 'styled-components';
import axios from '../axios';
import EthnicityChart from './chart/EthnicityChart';
import GEChart from './chart/GEChart';
import GenderChart from './chart/GenderChart';
import GRChart from './chart/GRChart';
import RaceChart from './chart/RaceChart';

const Container = styled.div`
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default function Charts({ gender, race, ethnicity }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const getApi = async () => {
      const result = await axios.get('/api/patient/stats');
      setStats(result.data.stats);
    }
    getApi();
  }, [])
  //console.log(stats);
  return (
    <Container>
      <GenderChart stats={stats} gender={gender} />
      <RaceChart stats={stats} race={race} />
      <EthnicityChart stats={stats} ethnicity={ethnicity} />
      <GRChart stats={stats} gender={gender} race={race} />
      <GEChart stats={stats} gender={gender} ethnicity={ethnicity} />
    </Container>
  )
}