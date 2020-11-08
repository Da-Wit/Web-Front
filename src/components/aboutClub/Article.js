import React, { useContext, useEffect, useState } from "react";
import PageWrap from "../PageWrap";
import {} from "../../styles/StyledArticle";
import { firestore } from "../../firebase";
import { Userinfo } from "../../App";
import { useHistory } from "react-router-dom";

const Article = ({ match }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(null);
  const [error, setError] = useState(false);

  const {
    params: { category, articleId, clublink },
  } = match;

  const { userObj } = useContext(Userinfo);
  const history = useHistory();

  const getArticle = async () => {
    setLoading(true);
    const rawData = await firestore.collection("articles").doc(articleId).get();
    const realArticle = rawData.data();
    if (realArticle) {
      const dbUser = await firestore
        .collection("additional userinfo")
        .doc(realArticle.creatorId)
        .get();
      const creatorName = dbUser.data().name;

      setArticle({ ...realArticle, creatorName });
      setEditText(realArticle.content);
    } else {
      setError(true);
    }

    setLoading(false);
  };
  const onDelete = async () => {
    const lastCheck = window.confirm(
      "Are you sure that you delete this article?"
    );
    if (lastCheck) {
      await firestore.collection("articles").doc(article.articleId).delete();
      history.push(`/club/${category}/${clublink}`);
    }
  };

  const onEditToggle = () => {
    setEdit((prev) => !prev);
  };
  const submitChange = async (e) => {
    e.preventDefault();
    console.log("clicked");
    await firestore
      .doc(`articles/${article.articleId}`)
      .update({ content: editText });
    setEdit(false);
    setArticle((prev) => ({ ...prev, content: editText }));
  };
  const onEditValueChange = (e) => {
    setEditText(e.target.value);
  };
  useEffect(() => {
    getArticle();
  }, []);

  return (
    <PageWrap>
      {loading ? (
        <h1>loading...</h1>
      ) : error ? (
        <h1>Url Error!</h1>
      ) : (
        <>
          <h1>{article.title}</h1>
          <span>
            {Date(new Date(article.date.seconds * 1000)).toString()} |{" "}
            {article.creatorName} | count : {article.count}
          </span>
          {userObj && (
            <>
              {userObj.uid === article.creatorId && (
                <>
                  {edit ? (
                    <form onSubmit={submitChange}>
                      <input
                        value={editText}
                        onChange={onEditValueChange}
                        placeholder="Edit content"
                      />
                      <button onClick={onEditToggle}>Cancle</button>
                      <input type="submit" value="Edit" />
                    </form>
                  ) : (
                    <>
                      <div>{article.content}</div>
                      <button onClick={onEditToggle}>Edit</button>{" "}
                      <button onClick={onDelete}>Delete</button>
                    </>
                  )}
                </>
              )}
              <form>
                <input
                  placeholder="Enter new comment here..."
                  name="commentContent"
                />
                <input type="submit" value="add comment" />
              </form>
            </>
          )}
        </>
      )}
    </PageWrap>
  );
};

export default Article;
