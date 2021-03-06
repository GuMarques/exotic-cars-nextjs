import { FC } from "react";

import searchIcon from "@icons/bx_bx-search.svg";
import DateContainer from "../DateContainer";
import { IconContainer } from "../DatePicker/styles";
import SearchInput from "../SearchInput";
import { SearchButton, SearchContainer, SearchOuterContainer } from "./styles";

const SearchBox: FC<{}> = (props) => {
  return (
    <SearchOuterContainer>
      <SearchContainer>
        <SearchInput />
        <DateContainer />
        <DateContainer />
        <SearchButton>
          <IconContainer src={searchIcon.src} />
        </SearchButton>
      </SearchContainer>
    </SearchOuterContainer>
  );
};

export default SearchBox;
