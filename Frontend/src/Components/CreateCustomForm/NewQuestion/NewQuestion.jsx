




import React from 'react'

const NewQuestion = () => {
  return (
    <>
    <h2>Question {x}</h2>
    <form action="">
            <label htmlFor="EngQuestion">English Question</label>
            <input type="text" id="EngQuestion" name="EngQuestion" />
            <label htmlFor="FrQuestion">French Question</label>
            <input type="text" id="FrQuestion" name="FrenchQuestion" />
            <label htmlFor="AnswerFormat">Answer Format</label>
            <select id="AnswerFormat" name="AnsFormat">
                <option value="text">Text</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
            </select>
    </form>
    </>
  )
}

export default NewQuestion