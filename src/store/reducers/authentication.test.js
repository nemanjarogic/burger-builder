import reducer from "./authentication";
import * as actionTypes from "../actions/actionTypes";

describe("Authentication reducer", () => {
  let initialState;
  beforeAll(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      isLoading: false,
      authRedirectPath: "/"
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should store user token upon login", () => {
    const successLoginPayload = {
      type: actionTypes.AUTH_SUCCEEDED,
      token: "test-token",
      userId: "test-user-id"
    };

    expect(reducer(initialState, successLoginPayload)).toEqual({
      token: "test-token",
      userId: "test-user-id",
      error: null,
      isLoading: false,
      authRedirectPath: "/"
    });
  });
});
