import Papa from 'papaparse'
import { useState, useEffect } from 'react'

import Preload from './components/Preload.jsx'
import './index.css'

function App() {
    const [result, setResult] = useState([])
    const [target, setTarget] = useState('臺北市')
    const [loadingState, setloadingState] = useState(true)

    // 更新閃爍
    const [second, setSecond] = useState(null)
    const [updateState, setUpdateState] = useState(false)

    function filterHandler(e) {
        // console.log(e.target.innerText)
        // 點擊同一個 target ，讓點擊無效
        if (target === e.target.innerText) return

        setTarget(e.target.innerText)
        
        // 改target 時，出現載入畫面
        setloadingState(true)
    }

    useEffect(() => {
        // immediately run first
        const url = "https://data.nhi.gov.tw/resource/Nhi_Fst/Fstdata.csv"
            // console.log(target, 'effect')
        Papa.parse(url, {
            download: true,
            complete: function(results, file) {
                // console.log("Parsing complete:", results, file)
                const data = results.data.slice(0, -1)
                const result = []
                
                data.forEach(item => {
                    // console.log(item[2])
                    // console.log(typeof item[2])
                    if (item[2].includes(target)) {
                        result.push(item)
                    }
                });
                setResult(result)
                setloadingState(false)

                
            }
        })

        // start run one by one
        const id = setInterval(() => {
            const url = "https://data.nhi.gov.tw/resource/Nhi_Fst/Fstdata.csv"
            // console.log(target, 'effect')
            Papa.parse(url, {
                download: true,
                complete: function(results, file) {
                    // console.log("Parsing complete:", results, file)
                    const data = results.data.slice(0, -1)
                    const result = []
                    
                    data.forEach(item => {
                        // console.log(item[2])
                        // console.log(typeof item[2])
                        if (item[2].includes(target)) {
                            result.push(item)
                        }
                    });
                    setResult(result)
                    setloadingState(false)
                    
                    // console.log(result)
                    // update 第二次
                    setSecond((p) => {
                        if (result[0][8] !== p) {
                            setUpdateState((p) => !p)
                        }
                        return result[0][8]
                    })

                }
            })
            // console.log(1)
        }, 15000)
        return () => clearInterval(id)
    }, [target])
   
    return (
        <div className="pb-2 bg-slate-500 min-h-screen">
            {/* Filter */}
            <div className="flex flex-wrap px-5 pt-4 sm:px-3">
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>新竹縣</span>
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>新竹市</span>
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>臺中市北區</span>
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>臺中市東區</span>
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>臺中市北屯區</span>
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>臺中市太平區</span>
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>臺北市</span>
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>新北市八里區</span>
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>新北市淡水區</span>
                <span className="mb-2 mr-1 px-4 py-1 rounded-lg whitespace-nowrap bg-indigo-900 text-cyan-100 cursor-pointer block" onClick={filterHandler}>新北市北投區</span>
            </div>

            {/* Filter title */}
            <div className="px-5 flex justify-between">
                <h3 className=" text-2xl ">{target}</h3>
                <span className="text-red-300 text-sm self-end animate-flash">資料自動更新中</span>
            </div>

            {/* Data list */}
            {/* <div className="px-5 pt-2">
                {result.length > 0 ? result.map((item) => {
                    return (
                        <div className="flex border-[3px]  border-black mb-2" key={item[0]}>
                            <div className="w-[120px] border-r-2  border-black bg-yellow-700  px-2 flex justify-center items-center">{item[1]}</div>
                            <div className="w-[576px] grow ">
                                <div className="border-b-2 border-black p-1 bg-green-400"> {item[2]}</div>
                                <div className={`border-b-2 border-black p-1 bg-yellow-200 font-medium ${item[7] < 20 ? 'text-red-500': 'text-blue-500'}`}> {item[7]}</div>
                                <div className="p-1 bg-stone-400">備註：{item[9]}</div>
                            </div>
                            <div className="border-l-2 border-black p-1 bg-slate-400">最後更新時間{item[8]}</div>
                        </div>
                    )
                }) : <div className="text-red-900 text-3xl">目前{target}全部藥局沒有存貨或發放</div>}
            </div> */}
            <div className="px-5 pt-2 sm:px-2">
                {loadingState ? <Preload /> : result.length > 0 ? result.map((item) => {
                    return (
                        <div className={`flex border-[3px]  border-black mb-2 relative animate-fade-in`} key={item[0]}>
                            <div className="w-[120px] border-r-2  border-black bg-yellow-700 p-2 flex justify-center items-center">{item[1]}</div>
                            <div className="w-[576px] grow flex flex-col">
                                <div className="border-b-2 border-black p-1 bg-green-600"> {item[2]}</div>
                                <div className={`border-b-2 border-black p-1 bg-yellow-500 font-medium ${item[7] < 20 ? 'text-red-500': 'text-blue-500'}`}> {item[7]}</div>
                                <div className="p-1 bg-stone-400 grow">備註：{item[9]}</div>
                            </div>
                            <div className="border-l-2 border-black p-1 bg-slate-400  sm:min-w-min">
                                {/* <p>最後更新時間</p>
                                <p>{String(item[8]).slice(0, 4)}</p>
                                <p>
                                    <span>{String(item[8]).slice(5, 7)}</span>-
                                    <span>{String(item[8]).slice(8, 10)}</span>
                                </p>
                                <p>{String(item[8]).slice(9, 11)}</p> */}
                                <p className="sm:min-w-max">最後更新時間</p> 
                                <p className="whitespace-nowrap">
                                    {String(item[8]).slice(0, 4)}-
                                    {String(item[8]).slice(5, 7)}-
                                    {String(item[8]).slice(8, 10)}
                                </p>
                                <p className={`transition ${updateState ? 'animate-blinking-1': 'animate-blinking-2'}`}>
                                    {String(item[8]).slice(11, 19)}
                                </p>
                            </div>
                        </div>
                    )
                }) : <div className="text-red-900 text-3xl ">目前{target}全部藥局沒有存貨或發放</div>}
            </div>
        </div>
    )
}

export default App