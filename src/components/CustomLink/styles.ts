import Link from "next/link";
import styled from "styled-components";

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: #313136;
    text-decoration: none;
  }
`;
