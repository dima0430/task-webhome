import React from 'react'
import axios from 'axios'
import './index.scss'

const Form = () => {
    const [emptyInput,setEmptyInput ] = React.useState(false)
    const [sendError,setSendError ] = React.useState(false)
    const [comment, setComment] = React.useState({name:'',text:''})
    const onSubmit=(e)=>{
        e.preventDefault()
        setSendError(false)
        const formData = new FormData();
        if(Object.values(comment).every(value=>value !=='')){
            formData.append('name',comment['name'])
            formData.append('text',comment['text'])
            axios.post('https://jordan.ashton.fashion/api/goods/30/comments',formData)
            .catch(setSendError(true)) 
            setComment({name:'',text:''})
            setEmptyInput(false)
        }
        else{
            setEmptyInput(true)
        }
    }
    const onChangeInputs=(e)=>{
        setComment(prev=>({...prev,...{[e.target.name]:e.target.value}}))
    }
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input className={`${emptyInput?'empty-input':''}`}  type="text" name="name" value={comment['name']} onChange={onChangeInputs} id="name"/>
            <label htmlFor="text">Text</label>
            <textarea className={`${emptyInput?'empty-input':''}`} type="text" name="text" value={comment['text']} onChange={onChangeInputs} id="text"/>
            <button>Submit</button>
            {emptyInput && <span className='warning-input'>Please,input all fields</span>}
            {sendError && <span className='send-error'>ERROR SENDING! Please, repeat.</span>}
        </form>
    )
}
export default Form
