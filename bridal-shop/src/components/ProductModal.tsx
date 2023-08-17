import { FormEvent, useState } from "react";

interface IProps {
  sizes: string[];
  handleShowModal: () => void;
  handleSelectSize: (event: FormEvent<HTMLFormElement>) => void;
}

export function ProductModal ({
  sizes,
  handleShowModal,
  handleSelectSize,
}: IProps) {

  return (
    <>
      <div className="bg-white text-main z-10 border rounded-lg p-4 fixed top-1/2 left-1/2 w-[90vw] h-[50vh] sm:w-1/2 sm:h-60 -translate-y-1/2 -translate-x-1/2">
        <button className="ml-[80%] sm:ml-[90%] border py-2 px-4 rounded-full mt-4" onClick={handleShowModal} type="button">&times;</button>
        <form className="flex flex-col items-center justify-center h-1/2 mt-8" onSubmit={handleSelectSize}>
          <label>Selecione o tamanho do vestido:</label>
          <select name="size" className="border rounded-lg py-2 px-4 mt-4">
            {sizes.map(size => <option key={size} value={size}>{size}</option>)}
          </select>
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button type="button" onClick={handleShowModal}  className="text-main font-bold border rounded-lg py-2 px-4 mt-4">Voltar</button>
            <button type="submit" className="text-main font-bold border rounded-lg py-2 px-4 mt-4">Confirmar</button>
          </div>
        </form>
      </div>
    </>
  )
}