import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from '../axios';

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Select = styled.select`
  width: 120px;
  height: 30px;
  font-weight: 600;
  margin: 10px 0px;
`;

export default function Filters({ setSortBy, setOrderBy, setLength, setGender, setAge, setRace, setEthinicity, setIsDeath }) {
  const [genderList, setGenderList] = useState([]);
  const [raceList, setRaceList] = useState([]);
  const [ethnicityList, setEthnicityList] = useState([]);

  const getGender = async () => {
    const result = await axios.get('/api/gender/list');
    //console.log(result.data);
    setGenderList(result.data.genderList);
  }
  const getRace = async () => {
    const result = await axios.get('/api/race/list');
    //console.log(result.data);
    setRaceList(result.data.raceList);
  }
  const getEthnicity = async () => {
    const result = await axios.get('/api/ethnicity/list');
    //console.log(result.data);
    setEthnicityList(result.data.ethnicityList);
  }

  useEffect(() => {
    getGender();
    getRace();
    getEthnicity();
  }, [])
  return (
    <Container>
      <Select name="sort" id="sort" onChange={e => setSortBy(e.target.value)}>
        <option value="">- 정렬 방식 선택 -</option>
        <option value="person_id">id</option>
        <option value="gender">gender</option>
        <option value="birth">birth</option>
        <option value="race">race</option>
        <option value="ethnicity">ethnicity</option>
        <option value="death">death</option>
      </Select>
      <Select name="order" id="order" onChange={e => setOrderBy(Boolean(e.target.value === "true" ? true : false))}>
        <option value="">- 정렬 순서 선택 -</option>
        <option value="true">내림차순</option>
        <option value="false">오름차순</option>
      </Select>
      <Select name="length" id="length" onChange={e => setLength(parseInt(e.target.value))}>
        <option value="0">- 행 갯수 선택 -</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Select>
      <Select name="gender" id="gender" onChange={e => setGender(e.target.value)}>
        <option value="">- 성별 선택 -</option>
        {
          genderList?.map(gender => <option key={gender} value={gender}>{gender}</option>)
        }
      </Select>
      <Select name="age" id="age" onChange={e => setAge(parseInt(e.target.value))}>
        <option value="">- 나이 선택 -</option>
        <option value="10">10세 미만</option>
        {
          new Array(11).fill(0).map((num, i) => <option key={i} value={i * 10 + 20}>{i * 10 + 10}대</option>)
        }
      </Select>
      <Select name="race" id="race" onChange={e => setRace(e.target.value)}>
        <option value="">- 인종 선택 -</option>
        {
          raceList?.map(race => <option key={race} value={race}>{race}</option>)
        }
      </Select>
      <Select name="ethnicity" id="ethnicity" onChange={e => setEthinicity(e.target.value)}>
        <option value="">- 민족 선택 -</option>
        {
          ethnicityList?.map(ethnicity => <option key={ethnicity} value={ethnicity}>{ethnicity}</option>)
        }
      </Select>
      <Select name="isDeath" id="isDeath" onChange={e => setIsDeath(Boolean(e.target.value === "true" ? true : false))}>
        <option value="">- 사망 여부 선택 -</option>
        <option value="true">Dead</option>
        <option value="false">Alive</option>
      </Select>
    </Container>
  )
}