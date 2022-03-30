import styled from "styled-components";
import Colors from "../../shared/constants/Colors";

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
`;

export const SecondContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: fit-content;
  cursor: pointer;
`;

export const LogoExotic = styled.h1`
  color: ${Colors.textPrimary};
  text-transform: uppercase;
  font-size: 1.5rem;
  line-height: 56px;
  font-weight: 600;
  margin: 0;
  margin-right: 0.3125rem;
  letter-spacing: 0.06rem;
  @media (min-width: 767.99px) and (max-width: 991.98px) {
    line-height: 83px;
  }
`;

export const LogoCars = styled.h1`
  color: ${Colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 0.04rem;
  font-weight: 500;
  font-size: 1rem;
  line-height: 56px;
  margin: 0;
  @media (min-width: 767.99px) and (max-width: 991.98px) {
    line-height: 83px;
  }
`;
