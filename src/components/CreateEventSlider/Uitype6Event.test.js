import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios"; // Mock axios for making requests
import Uitype6Event from "./Uitype6Event";
import { CheckModuleName } from "../../utils/CheckModuleName";

// Mock axios module
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

jest.mock("react", () => {
  const ActualReact = jest.requireActual("react");
  return {
    ...ActualReact,
    useContext: () => ({ blocke: {} }),
  };
});

// Mock CustomAxios object
const CustomAxios = {
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
};

// Mock CustomAxios object in global scope
global.CustomAxios = CustomAxios;

describe("Uitype6Event", () => {
  test("renders properly", async () => {
    // Mock data
    const acc = {
      relatedto: ["mock-relatedto"],
    };

    const add = {
      venue_name: "mock-venue-name",
      fieldname: "mock-fieldname",
    };

    // Mock axios response
    axios.get = jest.fn().mockResolvedValueOnce({
      data: {
        data: [{ mockData: "mockValue" }],
      },
    });

    render(<Uitype6Event acc={acc} add={add} />);

    // Wait for API request to resolve
    await waitFor(() => {
      // Check if the option elements are rendered properly
      expect(screen.getByText("mock-venue-name")).toBeInTheDocument();
      expect(screen.getByText("mockValue")).toBeInTheDocument();
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
