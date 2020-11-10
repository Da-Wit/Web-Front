import React from "react";
import axios from "axios";
import cheerio from "cheerio";
// import { getDateDifference } from "../../library/functions";
import { Background, Today, Container, Wrap } from "../../styles/StyledSchool";
import Content from "./Content";
import { Userinfo } from "../../App";
import { firestore } from "../../firebase";
const School = () => {
  console.error("School Feed Information Error");
  const [data, setData] = React.useState(null);
  const Diagnosis = "https://hcs.eduro.go.kr/#/loginHome";
  const homePage = "http://daekyeong.sen.hs.kr/index.do";
  let [onlineClass, setOnlineClass] = React.useState(
    "https://hoc23.ebssw.kr/onlineClass/search/onlineClassSearchView.do?schulCcode=00304&schCssTyp=online_high"
  );
  React.useEffect(() => {
    const getHtml = async () => {
      try {
        let result = "lodding";
        console.error("you have to think the weekend");
        const response = await axios.get(
          `http://daekyeong.sen.hs.kr/70633/subMenu.do`
        );
        const $ = cheerio.load(response.data);
        const $bodyList = $("td.today")[0].children[1].children[1].children[1]
          .attribs.onclick;
        if ($bodyList) {
          const rResult = $bodyList.replace(/[^0-9]/g, "");
          const sponse = await axios.get(
            `http://daekyeong.sen.hs.kr/dggb/module/mlsv/selectMlsvDetailPopup.do?mlsvId=${rResult}`
          );
          const op = cheerio.load(sponse.data);
          const $tableList = op("table tbody").children("tr")[3];
          const rawData = $tableList.children[3].children[0].data;
          result = rawData.slice(7, rawData.length - 6).split(",");
          setData(result);
        } else {
          result = "주말이라 급식 정보가 없습니다.";
          setData(result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getHtml();
  }, []);

  const userinfo = React.useContext(Userinfo);

  // React.useEffect(() => {}, []);
  React.useEffect(() => {
    const getUserinfo = async () => {
      if (userinfo.isLoggedIn) {
        for (let i in userinfo.userObj) {
          if (i === "uid") {
            const userData = await firestore
              .collection("additional userinfo")
              .doc(userinfo.userObj[i])
              .get();

            if (userData) {
              console.log(userData);
              setOnlineClass(
                `https://hoc23.ebssw.kr/20dk${userData.data().grade}${
                  userData.data().classnumber
                }`
              );
            }
          }
        }
      }
    };
    getUserinfo();
  }, [userinfo]);
  return (
    <div>
      <div>
        <div>
          <Content
            imagePath="/school.jpg"
            label="학교 홈페이지가기"
            link={homePage}
          />
          <Content
            imagePath="/Diagnosis.png"
            label="자가진단 하러가기"
            link={Diagnosis}
          />
          <Content
            imagePath="/online.png"
            label="온라인 클래스로"
            link={onlineClass}
          />
        </div>
      </div>
      <div>
        <h2>오늘의 급식</h2>
        <h2>-----------------------------</h2>
        {!data ? (
          <h2 style={{ fontSize: "1.5rem" }}>loading</h2>
        ) : (
          data.map((val, index) => (
            <h2 key={index} style={{ fontSize: "1.5rem" }}>
              {val}
            </h2>
          ))
        )}
        <h2>-----------------------------</h2>
      </div>
    </div>
  );
};
export default School;