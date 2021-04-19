import React from 'react';
import styled from 'styled-components';
import Row from './Row';

const STable = styled.table`
  margin: 0;
  padding: 0;
  @media screen and (max-width: 400px){
    width: 95%;
  }
  width: 400px;
`;

const Thead = styled.thead`
  background-color: black;
  color: white;
`;

const Tr = styled.tr`
  height: 50px;
`;

export default function Table({ patients }) {
  return (
    <STable>
      <Thead>
        <Tr>
          <th>
            환자 테이블
          </th>
        </Tr>
      </Thead>
      <tbody>
        {
          patients?.list?.map((patient, i) => <Row key={i} patient={patient} i={i} />)
        }
      </tbody>
    </STable>
  )
}