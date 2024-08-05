"use client";

import React, { useEffect, useRef, useState } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn, getSearchParamsArray, scrollToElement } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";

interface SearchbarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  pathname: string;
  getAutocompletes: any;
  imageTheme: boolean | null;
  autocompleteFieldName?: string;
  autocompleteProps?: { [key: string]: any };
}

export const Searchbar = ({
  id,
  pathname,
  imageTheme,
  getAutocompletes,
  autocompleteProps,
  autocompleteFieldName,
  ...inputProps
}: SearchbarProps) => {
  const urlPathname = usePathname();
  const searchParams = useSearchParams();

  const defaultSearchQuery =
    pathname === urlPathname ? searchParams.get("query") || "" : "";

  const [query, setQuery] = useState(defaultSearchQuery);
  const [debouncedQueryValue] = useDebounce(query, 500);

  const autocompletesContRef = useRef<HTMLDivElement | null>(null);

  const [showingAutocompletes, setShowingAutocompletes] = useState(false);
  const [autocompletes, setAutocompletes] = useState<
    { [key: string]: string }[]
  >([]);

  const [selectedAutocompInd, setSelectedAutocompInd] = useState<null | number>(
    null
  );

  useEffect(() => {
    getAutocompletes({ query: debouncedQueryValue, ...autocompleteProps }).then(
      (res: any) => setAutocompletes(res)
    );
  }, [debouncedQueryValue]);

  useEffect(() => {
    if (selectedAutocompInd === null) return;

    const container = autocompletesContRef.current;
    const item = document.querySelector(".selected-autocomplete");

    if (!item || !container) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    if (itemRect.bottom > containerRect.bottom) {
      container.scrollTop += itemRect.bottom - containerRect.bottom;
    } else if (itemRect.top < containerRect.top) {
      container.scrollTop -= containerRect.top - itemRect.top;
    }
  }, [selectedAutocompInd]);

  const router = useRouter();

  const onRemoveSearch = () => {
    const searchParamsArray = getSearchParamsArray(
      searchParams,
      [],
      ["query", "paginationToken", "going", "page"]
    );

    router.push(`${pathname}?${searchParamsArray.join("&")}`, {
      scroll: false,
    });

    setQuery("");
    setShowingAutocompletes(false);
    document.getElementById(id || "search-input")?.blur();

    scrollToElement("data-container", 48);
  };

  const onSearch = (e?: any, autocompleteValue?: string) => {
    if (e) e.preventDefault();

    const searchParamQuery = autocompleteValue
      ? autocompleteValue
      : selectedAutocompInd === null
      ? query
      : autocompletes.at(selectedAutocompInd)![autocompleteFieldName || "name"];

    const searchParamsArray = getSearchParamsArray(
      searchParams,
      searchParamQuery ? [`query=${searchParamQuery}`] : [],
      ["query", "paginationToken", "going", "page"]
    );

    router.push(`${pathname}?${searchParamsArray.join("&")}`, {
      scroll: false,
    });

    setShowingAutocompletes(false);
    document.getElementById(id || "search-input")?.blur();
    if (searchParamQuery !== query) setQuery(searchParamQuery);

    scrollToElement("data-container", 48);
  };

  const onArrowDown = () => {
    if (autocompletes.length === 0) return;

    if (selectedAutocompInd === null) setSelectedAutocompInd(0);
    else if (selectedAutocompInd === autocompletes.length - 1)
      setSelectedAutocompInd(null);
    else setSelectedAutocompInd((prev) => prev! + 1);
  };

  const onArrowUp = () => {
    if (autocompletes.length === 0) return;

    if (selectedAutocompInd === null)
      setSelectedAutocompInd(autocompletes.length - 1);
    else if (selectedAutocompInd === 0) setSelectedAutocompInd(null);
    else setSelectedAutocompInd((prev) => prev! - 1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
    if (e.key === "ArrowUp") onArrowUp();
    if (e.key === "ArrowDown") onArrowDown();
  };

  const isOldSearch = query === searchParams.get("query");

  return (
    <form className="w-full relative">
      <label className=" sr-only" htmlFor="search-input">
        Search
      </label>

      <Input
        type="text"
        name="search_bar"
        autoComplete="off"
        onKeyDown={onKeyDown}
        id={id || "search-input"}
        onFocus={() => setShowingAutocompletes(true)}
        value={
          selectedAutocompInd === null
            ? query
            : autocompletes.at(selectedAutocompInd)![
                autocompleteFieldName || "name"
              ]
        }
        onBlur={(e) => {
          if (e.relatedTarget?.id === "autocomplete") {
            e.preventDefault();
            return;
          }

          setShowingAutocompletes(false);
        }}
        onChange={(e) => {
          if (selectedAutocompInd !== null) setSelectedAutocompInd(null);
          setQuery(e.target.value);
        }}
        className={cn(
          "w-full pr-12",
          imageTheme &&
            "bg-transparent text-[#F6F5AE] focus-visible:ring-[#F6F5AE]/50 placeholder:text-[#F6F5AE]/80 ring-offset-white focus-visible:ring-offset-0 border-none"
        )}
        {...inputProps}
      />

      {!isOldSearch && (
        <Button
          size={"icon"}
          type="submit"
          variant={"ghost"}
          onClick={onSearch}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-2 p-2",
            imageTheme && "hover:bg-themeSecondary/20"
          )}
        >
          <span className="sr-only">Submit search</span>
          <Search
            className={cn(
              "w-[18px] h-[18px]",
              imageTheme ? "text-[#F6F5AE]" : "text-gray-400"
            )}
          />
        </Button>
      )}

      {isOldSearch && (
        <Button
          size={"icon"}
          type="submit"
          variant={"ghost"}
          onClick={onRemoveSearch}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-2 p-2",
            imageTheme && "hover:bg-themeSecondary/20"
          )}
        >
          <span className="sr-only">Remove search</span>
          <X
            className={cn(
              "w-[18px] h-[18px]",
              imageTheme ? "text-[#F6F5AE]" : "text-gray-400"
            )}
          />
        </Button>
      )}

      {autocompletes.length > 0 && showingAutocompletes && (
        <div
          ref={autocompletesContRef}
          className="absolute top-14 left-0 right-0 bg-white p-3 rounded-md drop-shadow-md z-[999999] max-h-52 overflow-y-auto"
        >
          <ul className="flex flex-col">
            {autocompletes.map((autocomplete, i) => (
              <li
                key={i}
                tabIndex={0}
                id="autocomplete"
                onClick={() => {
                  onSearch(
                    undefined,
                    autocomplete[autocompleteFieldName || "name"]
                  );
                }}
                className={cn(
                  "px-2 py-4 hover:bg-zinc-100 transition-colors rounded-lg flex flex-col gap-3",
                  selectedAutocompInd === i &&
                    "bg-zinc-100 selected-autocomplete"
                )}
              >
                <p className="text-zinc-700 text-[13px] leading-4 font-medium">
                  {autocomplete[autocompleteFieldName || "name"]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};
