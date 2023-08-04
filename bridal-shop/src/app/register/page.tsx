export default function Register() {
  return(
    <main className="flex justify-around flex-col-reverse sm:flex-row mt-8">
      <div className="flex items-center justify-center px-12 mt-8 sm:mt-0">
        <form className="flex flex-col">
          <h1 className="text-title text-main text-center font-bold">Cadastro de usuário</h1>
          <label htmlFor="name">Nome:</label>
          <input
          className="border rounded p-2 mb-2"
          type="text" id="name" name="name"/>

          <label htmlFor="email">E-mail:</label>
          <input
          className="border rounded p-2 mb-2"
          type="email" id="email" name="email"/>

          <label htmlFor="password">Senha:</label>
          <input
          className="border rounded p-2 mb-2"
          type="password" id="password" name="password"/>

          <label htmlFor="avatar_url">Avatar url:</label>
          <input
          className="border rounded p-2 mb-2"
          type="text" id="avatar_url" name="avatar_url"/>

          <button type="submit" className="border rounded w-[200px] px-2 py-3 m-auto mt-6">
            Salvar
          </button>
        </form>
      </div>

      <div className="flex justify-center items-center px-8">
        <div className="border w-[80%] h-[400px] sm:w-[300px] sm:h-[450px]">imagem</div>
      </div>
    </main>
  )
}