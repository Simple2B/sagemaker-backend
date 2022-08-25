import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFormData } from '../../redux/types/reportTypes';
import { useActions } from '../../redux/useActions';
import CustomInput from './CustomInput';

import "./FormInfo";

interface IFormInfo {
  id: string,
}

const studyFields = [
  {value: "business"}, 
  {value: "economics"}, 
  {value: "history"}, 
  {value: "philosophy"}, 
  {value: "political Science"}, 
  {value: "psychology"}, 
  {value: "sociology"}
]

const FormInfo: React.FC<IFormInfo> = ({id}) => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [title, setTitle] = useState("")
    const [abstract, setAbstract] = useState("")
    const [studyField, setStudyFields] = useState("business")

    const [errorName, setErrorName] = useState<string>("")
    const [errorEmail, setErrorEmail] = useState<string>("")

    const validateForm = () => {
      const nameLength = name.length;
      const emailLength = email.length;

      let errNameMsg = "";
      let errEmailMsg = "";

      if (nameLength === 0) {
        errNameMsg = "Name is empty";
      } else {
        errNameMsg = "";
      }

      if (emailLength === 0) {
        errEmailMsg = "Email is empty";
      } else {
        errEmailMsg = "";
      }

      if (errNameMsg.length === 0) {
        setErrorName("");
      } else {
        setErrorName(errNameMsg);
      }

      if (errEmailMsg.length === 0) {
        setErrorEmail("");
      } else {
        setErrorEmail(errEmailMsg);
      }
    }

    const changeValue = (
      value: string, 
      setValue: { (value: React.SetStateAction<string>): void; (arg0: any): void}
    ) => {
      validateForm();
      setValue(value)
    }

    const { fetchReport } = useActions()

    const handleSubmit = () => {
      validateForm();
      if (name.length === 0 || email.length === 0) {
        return
      };
      const dataToBack: IFormData = {
        name: name,
        email: email,
        title: title,
        abstract: abstract,
        study_field: studyField
      }
      fetchReport(dataToBack);
      navigate('/report')
    }

    const inputsData = [
      {
        inputLabel: "Your name",
        error: errorName,
        styles: "inputContainer",
        type: "text",
        placeholder: "John Doe",
        value: name,
        onChangeHandler: (e: { target: { value: string; }; }) => changeValue(e.target.value, setName) 
      },
      {
        inputLabel: "Your email",
        error: errorEmail,
        styles: "inputContainer",
        type: "email",
        placeholder: "jdoe@email.com",
        value: email,
        onChangeHandler: (e: { target: { value: string; }; }) => changeValue(e.target.value, setEmail) 
      },
      {
        inputLabel: "Paper title",
        error: "",
        styles: "inputContainer widthSize",
        type: "text",
        placeholder: "Title",
        value: title,
        onChangeHandler: (e: { target: { value: string; }; }) => changeValue(e.target.value, setTitle)
      },
      {
        inputLabel: "Paper Abstract",
        error: "",
        styles: "inputContainer widthSize heightSize",
        type: "text",
        placeholder: "Abstract",
        value: abstract,
        onChangeHandler: (e: { target: { value: string; }; }) => changeValue(e.target.value, setAbstract)
      },
    ]

    return(
        <section className='containerFormInfo'>
          <div className='containerFormInfo_title yellowColor' id={id}>
            Join the waitlist and see an example
          </div>
          { 
            inputsData.map((input, index) => {
                return (
                  <CustomInput 
                    key={index}
                    inputLabel={input.inputLabel} 
                    error={input.error}
                    styles={input.styles} 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    value={input.value} 
                    onChangeHandler={input.onChangeHandler} 
                  />
                )
            })
          }
          <div className='containerFormInfo_input'>
            <div className='inputLabel'>Field of study</div>
            <div className='inputContainer'>
              <select name="study" id="study" onChange={(e) => changeValue(e.target.value, setStudyFields)}>
                {studyFields.map((option, index) => {
                  return (
                    <option key={index} value={option.value} className="optionalItem">
                      {option.value}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className='containerFormInfo_btn' onClick={handleSubmit}>
            <div className='btn'>View example report</div> 
          </div>
        </section>
    )
}

export default FormInfo;
