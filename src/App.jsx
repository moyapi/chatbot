import React, { useCallback, useEffect, useState } from 'react'
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index';
import FormDialog from './components/Forms/FormDialog';
import { db } from "./firebase/index"

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const displayNextQuestion = (nextQuestionId,nextDataset) => {
    // const chats = this.state.chats;
    // chats.push({
    //   text: this.state.dataset[nextQuestionId].question,
    //   type: "question"
    // });
    // this.setState({
    //   answers: this.state.dataset[nextQuestionId].answers,
    //   chats: chats,
    //   currentId: nextQuestionId
    //})
    addChats({
      text: nextDataset.question,
      type: "question"
    });
    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  }

  const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
    //switch文の中で正規表現を使う場合は「switch (true)」とする。
    switch (true) {
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;
      case (nextQuestionId === "contact"):
        handleClickOpen();
        break;
      default:
        // const chats = chats;
        // chats.push({
        //   text: selectedAnswer,
        //   type: "answer"
        // });
        // this.setState({
        //   chats: chats,
        // })
        addChats({
          text: selectedAnswer,
          type: "answer"
        });
        setTimeout(() => displayNextQuestion(nextQuestionId,dataset[nextQuestionId]), 300);
        break;
    }
  })

  const addChats = (chat) => {
    //setStateを使うときで配列やオブジェクトを使うときは前回のデータも参照できる
    setChats(prevChat => {
      return [...prevChat, chat]
    })
  }
  useEffect(()=>{
    (async () => {
      const initDataset = {}
      await db.collection("questions").get().then((snapshots) => {
        snapshots.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          initDataset[id] = data;
        })
      })
      setDataset(initDataset);
      displayNextQuestion(currentId,initDataset[currentId]);
    })();
  },[])

  useEffect(()=>{
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  //毎回動いてほしい為、第2引数は指定しない
  })

  return (
    <section className="c-section">
      <div className='c-box'>
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}
export default App;
