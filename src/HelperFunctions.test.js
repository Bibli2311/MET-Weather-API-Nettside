import { sortByDangerLevel } from "./HelperFunctions";
import { fetchData } from "./HelperFunctions";

test('sortByDanger function can sort by danger', async () =>
{
    let xmlData = await fetchData("https://api.met.no/weatherapi/metalerts/1.1?show=all")
    let testArr = xmlData.getElementsByTagName("title")
    console.log(testArr)

    expect(testArr.length).toBe(10);
})