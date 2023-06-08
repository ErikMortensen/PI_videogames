import style from "./Wrapper.module.css";

export const Wrapper = ({currentPage,handlerNext,handlerPrev}) => {
  return (
    <div className={style.paginationContainer}>
        <button onClick={handlerPrev}>Prev</button>
        <h5>Página: {currentPage}</h5>
        <button onClick={handlerNext}>Next</button>
    </div>
  )
}
