import { sortByDangerLevel } from "./HelperFunctions";

describe("sortByDangerLevel function", () => {
    const testArray = {
      "1": {
        getElementsByTagName: (tag) => ({
          textContent: "Kansellert Sterk ising på skip, oransje nivå, B4, 18 februar",
        }),
      },
      "2": {
        getElementsByTagName: (tag) => ({
          textContent: "Another incident, no danger level",
        }),
      },
      "3": {
        getElementsByTagName: (tag) => ({
          textContent: "Another incident, nivå and oransje not in danger level",
        }),
      },
    };
  
    it("should return an array of incidents with danger level 'nivå' and 'oransje'", () => {
      const result = sortByDangerLevel(testArray);
      expect(result.length).toBe(1);
      expect(result[0]).toBe(testArray["1"]);
    });
  });