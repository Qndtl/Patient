import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../axios';

const Tr = styled.tr`
  background-color: ${props => props.i % 2 === 0 ? "#d9d9d9" : "#b8b8b8"};
  height: 50px;
  li {
    padding-left: 10px;
  }
  &:hover{
    background-color: white;
  }
`;

const Td = styled.td` 
  width: 100%;
  cursor: pointer;
  display: grid;
  font-size: 0.9rem;
  grid-template-columns: 1.1fr 0.5fr 0.7fr 0.9fr;
  grid-template-rows: 1fr, 1fr;
  grid-row-gap: 8px;
  @media screen and (max-width: 400px){
    font-size: 0.7rem;
    margin-top: 5px;
  }
`;

const RaceColumn = styled.span`
  grid-column: 2/4;
`;

export default function Row({ patient, i }) {
  const [clicked, setClicked] = useState(false);
  const [detail, setDetail] = useState({});

  const onClick = async (id) => {
    if (clicked === false) {
      setClicked(true);
      const result = await axios.get(`/api/patient/brief/${id}`);
      setDetail(result.data);
      //console.log(result.data);
    } else {
      setClicked(false);
    }
  }


  return (
    <>
      <Tr i={i} onClick={() => onClick(patient?.personID)}>
        <Td>
          <span>환자 ID: <b>{patient?.personID}</b></span>
          <span>성별: <b>{patient?.gender}</b></span>
          <span>나이: <b>{patient?.age}세</b></span>
          <span>사망여부: <b>{patient?.isDeath.toString()}</b></span>
          <span>민족: <b>{patient?.ethnicity}</b></span>
          <RaceColumn>인종: <b>{patient?.race}</b></RaceColumn>
          <span><b>{patient?.birthDatetime.split(' ')[0]}</b></span>
        </Td>
      </Tr>
      {
        clicked ? (
          <Tr i={i}>
            <td>
              <ul>
                <b>진단 정보</b>
                {
                  detail?.conditionList?.map((condition, i) => <li key={i} style={{ listStyle: "none" }}>- {condition}</li>)
                }
                <b>전체 방문 수: {detail?.visitCount}회</b>
              </ul>
            </td>
          </Tr>
        ) : null
      }
    </>
  )
}