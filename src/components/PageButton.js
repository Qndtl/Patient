import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  button {
    width: 35px;
    height: 35px;
    cursor: pointer;
    font-size: 18px;
  }
  margin:20px 0px;
`;

const ArrowBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;

export default function PageButton({ maxPageNum, page, setPage }) {
  const [me, setMe] = useState(1);
  const pageArr = [];
  if (maxPageNum !== "NaN") {
    for (let i = 0; i < parseInt(maxPageNum); i++) {
      pageArr.push(i + 1);
    }
  }
  return (
    <Container>
      <>
        <ArrowBtn
          onClick={() => { setPage(1); setMe(1) }}
          disabled={page === 1 ? true : false}>
          &#60;&#60;
        </ArrowBtn>
        <ArrowBtn
          onClick={() => { setPage(page - 1); setMe(page - 1) }}
          disabled={page === 1 ? true : false}>
          &#60;
        </ArrowBtn>
        {pageArr.slice(page < 3 ? 0 : page - 3, page + 2 < 5 ? 5 : page + 2).map((num, i) => <button key={num} style={num === me ? { fontWeight: "600" } : null} me={me} onClick={() => { setPage(num); setMe(num) }}>{num}</button>)}
        <ArrowBtn
          onClick={() => { setPage(page + 1); setMe(page + 1) }}
          disabled={page === parseInt(maxPageNum) ? true : false}>
          &#62;
        </ArrowBtn>
        <ArrowBtn
          onClick={() => { setPage(parseInt(maxPageNum)); setMe(parseInt(maxPageNum)) }}
          disabled={page === parseInt(maxPageNum) ? true : false}>
          &#62;&#62;
        </ArrowBtn>
      </>
    </Container>
  )
}