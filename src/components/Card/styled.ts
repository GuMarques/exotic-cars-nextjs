import styled from "styled-components";
import Image from "next/image";

export const CardContainer = styled.div`
  width: 287px;
  display: flex;
  cursor: pointer;
  margin-right: 24px;
  flex-direction: column;
  border-radius: 13px;
  justify-content: center;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: #f8f8fa;
  margin: 10px;
  p {
    margin: 0;
  }
  transition: all 0.5s ease-in-out;
  :hover {
    background-color: #f3f1fc;
  }
`;

export const BrandName = styled.p`
  font-family: "Segoe UI";
  font-weight: bold;
  font-size: 17px;
  color: #313136;
  padding-left: 17px;
`;

export const ModelName = styled.p`
  font-family: "Segoe UI";
  font-weight: lighter;
  color: #313136;
  padding-left: 17px;
`;

export const CarImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const DolarSign = styled.p`
  font-size: 14px;
  font-family: "Segoe UI";
  font-weight: bold;
  color: #313136;
  align-self: flex-start;
`;

export const Price = styled.p`
  font-size: 24px;
  font-family: "Segoe UI";
  font-weight: bold;
  color: #313136;
  align-self: center;
`;

export const ByDay = styled.p`
  font-size: 14px;
  font-family: "Segoe UI";
  font-weight: 300;
  color: #313136;
  align-self: flex-end;
  padding-right: 17px;
`;
