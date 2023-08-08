interface IProps {
  productsPerPage: number,
  totalProducts: number,
  paginateFront: () => void,
  paginateBack: () => void,
  currentPage: number,
}
export function Pagination(
  {
    productsPerPage,
    totalProducts,
    paginateFront,
    paginateBack,
    currentPage,
  }: IProps
){
  return (
    <div className='py-2 text-right pr-4 sm:pr-8'>
      <p className="text-main">Total de vestidos: {totalProducts}</p>
      <nav className=""/>
      <div>
        <nav
          className='border p-2 relative z-0 inline-flex gap-2 rounded-3xl shadow-sm mt-2'
          aria-label='Pagination'
        >
          <a
            onClick={paginateBack}
            href='#'
            className='w-[45px] h-[45px] text-center px-2 py-2 rounded-2xl border text-sm font-bold border-main bg-white text-main'
          >
            <span>&lt;</span>
          </a>
          <div className='w-[45px] h-[45px] text-center px-2 py-2 rounded-2xl border text-sm font-bold border-main bg-main text-white'>
            <span>{currentPage}</span>
          </div>
          <div className='w-[45px] h-[45px] text-center px-2 py-2 rounded-2xl border text-sm font-bold border-main bg-white text-main'>
            <span>de</span>
          </div>
          <div className='w-[45px] h-[45px] text-center px-2 py-2 rounded-2xl border text-sm font-bold border-main bg-white text-main'>
            <span>{currentPage * productsPerPage}</span>
          </div>
          <a
            onClick={paginateFront}
            href='#'
            className='w-[45px] h-[45px] text-center px-2 py-2 rounded-2xl border text-sm font-bold border-main bg-main text-white'
          >
            <span>&gt;</span>
          </a>
        </nav>
      </div>
    </div>
  );
}