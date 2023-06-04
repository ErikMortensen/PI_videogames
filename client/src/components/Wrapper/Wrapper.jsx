
export const Wrapper = ({currentPage,handlerNext,handlerPrev}) => {
  return (
    <div>
        <button onClick={handlerPrev}>Prev</button>
        <h5>Página: {currentPage}</h5>
        <button onClick={handlerNext}>Next</button>
    </div>
  )
}
