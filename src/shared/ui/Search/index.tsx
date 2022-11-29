import { ChangeEvent, useState } from "react";
import { SearchProps } from "./interfaces";

import { SearchContainer } from "./styled";

const Search = ({ onSearch }: SearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSetSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <SearchContainer
      onChange={handleSetSearch}
      value={searchValue}
      placeholder="поиск"
    />
  );
};

export default Search;
