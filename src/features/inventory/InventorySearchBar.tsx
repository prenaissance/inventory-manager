import { debounce } from "@/shared/utils";
import { Input, InputProps } from "@chakra-ui/react";
import { ChangeEventHandler, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const InventorySearchBar = (props: InputProps) => {
  const [params, setParams] = useSearchParams({
    search: "",
  });
  const search = params.get("search");
  const handleChange: ChangeEventHandler<HTMLInputElement> = useMemo(
    () => debounce((e) => setParams({ search: e.target.value }), 500),
    [setParams],
  );

  return (
    <Input
      placeholder="Start typing to filter items"
      defaultValue={search ?? ""}
      onChange={handleChange}
      color="gray.600"
      {...props}
    />
  );
};
