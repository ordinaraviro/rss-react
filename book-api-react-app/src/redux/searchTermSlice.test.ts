import searchTermReducer, {
  setSearchTerm,
  SearchTermState,
} from "./searchTermSlice";

describe("searchTerm slice", () => {
  const initialState: SearchTermState = {
    searchTerm: localStorage.getItem("searchTerm") || "",
  };

  it("should handle initial state", () => {
    expect(searchTermReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  it("should handle setSearchTerm", () => {
    const newSearchTerm = "Redux Testing";
    const actual = searchTermReducer(
      initialState,
      setSearchTerm(newSearchTerm),
    );
    expect(actual.searchTerm).toEqual(newSearchTerm);
  });
});
