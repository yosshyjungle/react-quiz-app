import { useState } from 'react';
import './App.css';

function App() {

  const [ currentQuestion, setCurrentQuestion ] = useState(0);
  // フィードバック画面のState管理
  const [ next, setNext ] = useState(false);
  // ユーザー解答履歴のState管理
  const [ answers, setAnswers ] = useState([]);
  // Scoreの管理
  const [ score, setScore ] = useState(0);
  // 〇か×か管理
  const [ feedback, setFeedback ] = useState(null);
  // score画面の表示 trueに代わるとscoreページを表示
  const [ showScore, setShowScore ] = useState(false);

  const handleAnswer = (answer) => {
    // console.log(answer);
    // ユーザーの解答履歴
    const newAnswer = {
      // 問題
      question: quizData[currentQuestion].question,
      // 自分の解答
      answer: answer,
      // 解答の成否　ユーザーの解答とquizDataのcorrectが同じならtrue
      correct: answer === quizData[currentQuestion].correct,
    };
    console.log(newAnswer);
    // 問題が正解していた場合、score + 1
    if(newAnswer.correct){
      setScore((prevScore) => prevScore + 1);
      setFeedback("〇");
    } else {
      // 不正解の場合
      setFeedback("×");
    }
    setAnswers([...answers, newAnswer]);
    console.log(answers);
    // フィードバック画面のStateをfalseからtrueに変更
    setNext(true);
  }

  const gotoNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    // 次の問題がある場合
    if(nextQuestion < quizData.length){
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
    setNext(false)
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className='score-section'>
          <h1>スコア</h1>
          <h2>{score} / {quizData.length}</h2>
          <table className='answer-table'>
            <thead>
              <tr>
                <td>質問</td> <td>あなたの解答</td> <td>合否</td>
              </tr>
            </thead>
            <tbody>
              {answers.map((item)=>(
                <tr className={item.correct ? 'correct' : 'wrong'}>
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                  <td>{item.correct ? '〇' : '×'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='question-section'>
        <h1>問題{currentQuestion + 1} / {quizData.length}</h1>
        <h2>{quizData[currentQuestion].question}</h2>

        {next ? (
          <div className='feedback-section'>
          {/* 合否を表示 */}
            <h2 className='large-feedback'>{feedback}</h2>
            <p>正解は</p>
            <p>{quizData[currentQuestion].correct}</p>
            <button onClick={gotoNextQuestion}>次の問題へ</button>
          </div>

        ) : (
          <div className='answer-section'>
          {quizData[currentQuestion].options.map((item, index)=>(
            <button key={index} onClick={()=> handleAnswer(item)} className={`quiz-option-button option-${index}`}>{item}</button>
          ))}
          </div>
        )}        
        </div>
      )}       
    </div>
  );
}

export default App;

const quizData = [
  {
    question: "太陽系で最も大きい惑星はどれですか？",
    options: ["地球", "火星", "金星", "木星"],
    correct: "木星",
  },
  {
    question: "次のうち、哺乳類ではない動物はどれですか？",
    options: ["カンガルー", "ゴリラ", "ペンギン", "カバ"],
    correct: "ペンギン",
  },
  {
    question: "モナ・リザを描いた画家は誰ですか？",
    options: ["レオナルド・ダ・ヴィンチ", "ミケランジェロ", "フィンセント・ヴァン・ゴッホ", "クロード・モネ"],
    correct: "レオナルド・ダ・ヴィンチ",
  },
  {
    question: "以下の食材の中で、一般的にはうだものとして認識されていないものはどれですか？",
    options: ["トマト", "りんご", "ぶどう", "ブロッコリー", "バナナ"],
    correct: "ブロッコリー",
  },
];


