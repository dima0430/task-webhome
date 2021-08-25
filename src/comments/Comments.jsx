import React from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import './index.scss'

const Comments = () => {
    const [comments, setComments] = React.useState([])
    const [pages, setPages] = React.useState({maxPage:0,currentPage:0})
    React.useEffect(() => {
			axios.get('https://jordan.ashton.fashion/api/goods/30/comments')
			.then(response=>{
                setComments(response.data.data);
                setPages({maxPage:response.data.last_page,currentPage:1})
            })
		}, [])

    const handleMore=()=>{
        axios.get(`https://jordan.ashton.fashion/api/goods/30/comments?page=${pages['currentPage']+1}`)
			.then(response=>{
                setComments(prev=>[...prev,...response.data.data]);
                setPages(prev=>({...prev,...{currentPage:prev.currentPage+1}}))
            })
    }

    const onPageChange=(page)=>{
        axios.get(`https://jordan.ashton.fashion/api/goods/30/comments?page=${page.selected+1}`)
		.then(response=>{
            setComments(response.data.data);
            setPages(prev=>({...prev,...{currentPage:page.selected+1}}))
         })
    }
    return (
        <div className='comments-wrapper'>
            <div className="comments">
                {comments.map(((item,index)=>
                    <div className='comment-item' key={`${item.name}'_'${index}`}>
                        <h5 className='comment-title'>Comment №{item.id}</h5>
                        <div className='comment-title'>Name:</div>
                        <div className='comment-values'>{item.name}</div>
                        <div className='comment-title'>Text:</div>
                        <div className='comment-values'>{item.text}</div>
                    </div>
                ))}
            </div>    
            <div className='comments-button'>{pages['currentPage']!==92 && <button onClick={handleMore} >More</button>}
            </div>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={92}
                marginPagesDisplayed={2}
                forcePage={pages.currentPage-1}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    )
}
export default Comments