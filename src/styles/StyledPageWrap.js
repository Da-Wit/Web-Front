import styled from "styled-components";

const ContentTemplate = styled.div`
  /* width: 100%; */
  /* padding-top: 3%; */
  /* height: 100vh; */
  margin: 1rem 2rem;
  @media only screen and (min-height: 101vh) {
    height: 100%;
    margin: 0 auto;
  }
`;

const ContentJustify = styled.div`
  width: 90%;
  margin: 2vh auto;
  /* background: mintcream; */
  background: white;
  border-radius: 10px;
  border: 1px solid #d7d9d9;
`;

export { ContentJustify, ContentTemplate };
