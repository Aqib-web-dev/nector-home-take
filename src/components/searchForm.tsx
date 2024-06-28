"use client";

import { ChangeEvent, FormEvent } from "react";
import { Input, Button } from "@nextui-org/react";

interface SearchFormProps {
  placeholder: string;
  query: string;
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
}

const SearchForm = ({
  placeholder,
  query,
  onQueryChange,
  onSubmit,
  onClear,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex">
      <Input
        placeholder={placeholder}
        value={query}
        onChange={onQueryChange}
        isClearable
        onClear={onClear}
      />
      <Button
        disableRipple
        type="submit"
        className="bg-gradient-to-r from-tmdbLightGreen to-tmdbLightBlue text-white py-2 px-6 rounded-full"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
