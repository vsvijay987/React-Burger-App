import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      tokenId: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: "/",
    });
  });

  it("should store token upon login", () => {
    expect(
      reducer(
        {
          tokenId: null,
          userId: null,
          loading: false,
          error: null,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          tokenId: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      tokenId: "some-token",
      userId: "some-user-id",
      loading: false,
      error: null,
      authRedirectPath: "/",
    });
  });
});
