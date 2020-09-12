import React from "react";
import axios from "axios";
import cheerio from "cheerio";
import { Background, Today, MainBanner } from "../styles/StyledSchool";

const School = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(2020, 8, 9);
    const secondDate = new Date();
    secondDate.setMinutes(0);
    secondDate.setHours(0);
    secondDate.setSeconds(0);
    const diffDays = Math.round(Math.abs((secondDate - firstDate) / oneDay));
    const mlsvId = 1409338 + diffDays;

    const getHtml = async () => {
      try {
        throw "you have to think the weekend";
        const response = await axios.get(
          `http://daekyeong.sen.hs.kr/dggb/module/mlsv/selectMlsvDetailPopup.do?mlsvId=${mlsvId}`
        );
        const $ = cheerio.load(response.data);
        const $bodyList = $("table tbody").children("tr")[3];
        const rawData = $bodyList.children[3].children[0].data;
        const result = rawData.slice(7, rawData.length - 6).split(",");
        setData(result);

        return response;
      } catch (error) {
        console.error(error);
      }
    };
    getHtml();
  }, []);

  return (
    <Background>
      <MainBanner>
        <div>자가진단</div>
        <div>Schedule</div>
        <div>Online Class</div>
      </MainBanner>
      <Today>
        {!data ? (
          <h2>loading</h2>
        ) : (
          data.map((val, index) => <h2 key={index}>{val}</h2>)
        )}
      </Today>
    </Background>
  );
};
export default School;
