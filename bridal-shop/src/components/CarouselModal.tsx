import Image from "next/image";

interface IProps {
  dress: string;
  handleShowModal: () => void;
}

export function CarouselModal({dress, handleShowModal}: IProps){
  return (
    <div className="bg-white text-main z-10 border rounded-lg p-4 fixed top-1/2 left-1/2 w-[90vw] h-auto sm:w-[80vw] sm:h-[100vh] -translate-y-1/2 -translate-x-1/2">
      <button className="ml-[80%] sm:ml-[90%] border py-2 px-4 rounded-full mt-4" onClick={handleShowModal} type="button">&times;</button>
      <div className="flex flex-col items-center justify-center mt-4">
        <Image src={dress} alt="vestido de noiva" width={400} height={400} className="hover:scale-150 transition duration-500 cursor-zoom-out object-contain max-w-[70vw] max-h-[70vh]"/>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button type="button" onClick={handleShowModal}
            className="text-main font-bold border rounded-lg py-2 px-4 mt-2"
            aria-label="Fechar janela">Voltar</button>
          </div>
      </div>
    </div>
  );
}