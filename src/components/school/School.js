import React from "react";
import axios from "axios";
import cheerio from "cheerio";
import { getDateDifference } from "../../library/functions";
import { Background, Today, Container, Wrap } from "../../styles/StyledSchool";
import Content from "./Content";
import { Userinfo } from "..";
import { auth } from "firebase";
import { firestore } from "../../firebase";
const School = () => {
  const [data, setData] = React.useState(null);
  const Diagnosis = "https://hcs.eduro.go.kr/#/loginHome";
  const homePage = "http://daekyeong.sen.hs.kr/index.do";
  let [onlineClass, setOnlineClass] = React.useState(
    "https://hoc23.ebssw.kr/onlineClass/search/onlineClassSearchView.do?schulCcode=00304&schCssTyp=online_high"
  );

  console.error("put user customized onlineclass link");
  React.useEffect(() => {
    const getHtml = async () => {
      try {
        console.error("you have to think the weekend");
        const response = await axios.get(
          `http://daekyeong.sen.hs.kr/dggb/module/mlsv/selectMlsvDetailPopup.do?mlsvId=${getDateDifference()}`
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

  const userinfo = React.useContext(Userinfo);
  let infoInFirestore;
  const getUserinfo = () => {
    if (userinfo.isLoggedIn) {
      for (let i in userinfo.userObj) {
        if (i === "uid") {
          infoInFirestore = firestore
            .collection("additional userinfo")
            .doc(userinfo.userObj[i])
            .get()
            .then((doc) => {
              console.log("set!");
              setOnlineClass(
                `https://hoc23.ebssw.kr/20dk${doc.data().grade}${
                  doc.data().classnumber
                }`
              );
            })
            .catch((error) => {
              throw error;
            });
        }
      }
    }
  };

  // React.useEffect(() => {}, []);
  React.useEffect(() => {
    getUserinfo();
  }, [userinfo]);
  return (
    <Background>
      <Wrap>
        <Container>
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
        </Container>
      </Wrap>
      <Today>
        <h2>오늘의 급식</h2>
        <h2>-----------------------------</h2>
        {!data ? (
          <h2>loading</h2>
        ) : (
          data.map((val, index) => <h2 key={index}>{val}</h2>)
        )}
        <h2>-----------------------------</h2>
      </Today>
    </Background>
  );
};
export default School;
