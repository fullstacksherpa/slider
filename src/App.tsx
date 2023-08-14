import React, {useState, useEffect} from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data, {PeopleType} from './data'
function App() {
  const [people, setPeople] = useState<PeopleType[]>(data)
  const [index, setIndex] = useState<number>(0)



  useEffect(()=>{
    const lastIndex = people.length -1;
    if (index < 0){
      setIndex(lastIndex)
    }
    if (index > lastIndex){
      setIndex(0)
    }
  },[index, people])



  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((prevIndex)=> (prevIndex + 1)% people.length);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);


  return (
    <section className="w-[90vw] my-20 mx-auto bg-[#f1f5f8]">
      <div className="text-center mb-8">
        <h2 className='flex items-center justify-center font-medium'><span className='text-4xl text-[#ba5d2c] mr-4 font-bold' >/</span>reviews</h2>
      </div>
      <div className="mx-auto mt-16 w-[80vw] h-[450px] max-w-3xl text-center relative dlex overflow-hidden">
        {people.map((person, personIndex)=>{
          const {id, image, name, title, quote} = person;

          let position = 'transform translate-x-0'

          if (personIndex === index){
            position = "opacity-1 transform translate-x-0"
          }

          if (personIndex === index -1 || (index ===0 && personIndex === people.length-1)) {
            position = 'transfrom -translate-x-full';
          }
          return (
            <article className={`opacity-0 absolute top-0 left-0 w-full h-full transition-all duration-300 ease-linear  ${position}`} key={id}>
              <img src={image} alt={name} className="rounded-full mb-4 w-[150px] h-[150px] object-cover border-[4px] border-solid border-[#bcccdc]" />
              <h4 className='capitalize text-[#ba5d2c] mb-1'>{name}</h4>
              <p className="capitalize mb-3 text-[#324d67]">{title}</p>
              <p className="max-w-[35em] mx-auto mt-8 leading-8 text-[#617d98]">{quote}</p>
              <FaQuoteRight className="text-4xl mt-4 text-[#ba5d2c] mx-auto" />
            </article>
          );

        })}
         <button className="absolute top-[50%] transform -translate-y-1/2 bg-[#617d98] text-white w-5 h-5 grid items-center border-transparent text-base rounded-md cursor-pointer transition-all duration-300 ease-linear left-0 hover:bg-[#ba5d2c]" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="absolute top-[50%] transform -translate-y-1/2 bg-[#617d98] text-white w-5 h-5 grid items-center border-transparent text-base rounded-md cursor-pointer transition-all duration-300 ease-linear right-0 hover:bg-[#ba5d2c]" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>

  )
}

export default App
