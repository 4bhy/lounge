import React from 'react'

const LandingPagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {

    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)(
        pages.push(i)
    )

    return (
        <div>
            <ol class="flex justify-center gap-1 text-xs font-medium">
                <li>
                    <button
                        onClick={()=>{setCurrentPage(currentPage-1)}}
                        class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100">
                        <span class="sr-only">Prev Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
                {
                    pages.map((page, index) => {
                        return <button 
                        onClick={()=>{setCurrentPage(page)}}
                        
                        className={page==currentPage? 'inline-flex h-8 w-8 items-center justify-center rounded border border-gray-700' : 'inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100'} key={index}>{page}</button>
                    })
                }

                <li>
                    <button
                     onClick={()=>{setCurrentPage(currentPage+1)}}
                        class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100">
                        <span class="sr-only">Next Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"/>
                        </svg>
                    </button>
                </li>
            </ol>
        </div>
    )
}

export default LandingPagination
