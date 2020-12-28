import styled from "styled-components";

const Body = styled.article`
  background: white;
  border: 0.4px solid #aaa;
  border-radius: 10px;
  margin-top: 20px;
  transition: 0.2s ease;
  :hover {
    border: 0.4px solid black;
  }
`;
const Inner = styled.div`
  margin-left: 14px;
  margin-top: 5px;
  margin-bottom: 7px;
`;
const Writer = styled.span`
  font-size: 12px;
  background: #bbb;
  padding: 2px 4px;
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 1.17em;
  margin-top: 10px;
`;
const Info = styled.span`
  color: gray;
  font-size: 12px;
  margin-left: 7px;
`;
const Comment = styled.div`
  :hover {
    background: #dae0e6;
  }
  margin-top: 40px;
  padding: 0 3px;
  color: #8c8a8c;
  font-weight: 600;
  font-size: 12px;
  width: max-content;
`;

export { Body, Title, Writer, Inner, Info, Comment };
