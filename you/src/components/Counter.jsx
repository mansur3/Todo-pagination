import {useState, useEffect} from "react";



export const Counter = ({end}) => {

    const [count, setCount]  = useState(0);


    useEffect(() => {

     let id = setInterval(() => {
            
            setCount((prev)=> {
                if(prev === end) {
                    clearInterval(id);
                    return prev;
                }
                return prev + 1;
            })

        }, 1000)

        return () => {
            clearInterval(id);
        }

    }, [])



    return (
        <div>
            <h1>Counter : {count} </h1>
        </div>
    )
}