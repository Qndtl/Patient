import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from './axios';
import Charts from './components/Charts';
import Filters from './components/Filters';
import PageButton from './components/PageButton';
import Table from './components/Table';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin: 30px 0px;
  }
  h5 {
    margin-top: 20px;
  }
`;

export default function App() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [length, setLength] = useState(10);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [race, setRace] = useState(null);
  const [ethnicity, setEthinicity] = useState(null);
  const [isDeath, setIsDeath] = useState(null);
  useEffect(() => {
    const getApi = async () => {
      const result = await axios.get('/api/patient/list', {
        params: {
          page,
          order_column: sortBy,
          order_desc: orderBy,
          length,
          gender: gender === "" ? null : gender,
          age_min: age ? age - 10 : null,
          age_max: age ? age : null,
          race: race === "" ? null : race,
          ethnicity: ethnicity === "" ? null : ethnicity,
          death: isDeath
        }
      });
      //console.log(result.data);
      setPatients(result.data.patient);
    }
    getApi();
  }, [page, sortBy, orderBy, length, gender, age, race, ethnicity, isDeath])
  return (
    <Container>
      <h1>환자 정보 탐색</h1>
      <Table patients={patients} />
      <h5>필터링된 환자 수: {patients?.totalLength}</h5>
      <PageButton maxPageNum={(Math.ceil(patients?.totalLength / length)).toString()} page={page} setPage={setPage} />
      <Filters setSortBy={setSortBy} setOrderBy={setOrderBy} setLength={setLength} setGender={setGender} setAge={setAge} setRace={setRace} setEthinicity={setEthinicity} setIsDeath={setIsDeath} />
      <Charts gender={gender} race={race} ethnicity={ethnicity} />
    </Container>
  )
}