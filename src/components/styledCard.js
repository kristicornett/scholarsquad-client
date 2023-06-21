import styled from "styled-components";

export const StyledCard = styled.div`
  .card {
    margin-top: 40px;
    border-radius: spacing(0.5);
    transition: 0.3s;
    width: 90%;
    overflow: initial;
    background-color: #ffffff;
  }

  .content {
    text-align: left;
    overflow-x: auto;
  }

  .root {
    background-color: #3f51b5;
    border-radius: 8px;
    margin: auto;
    width: 88%;
    box-shadow: 0px 3px 8px rgba(34, 35, 58, 0.5);
  }

  .title {
    color: white;
    font-weight: bold;
  }
`;