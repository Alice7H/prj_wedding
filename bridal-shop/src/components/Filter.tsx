import { AccessoriesFilterOptions } from "./AccessoriesFilterOptions"
import { DressesFilterOptions } from "./DressesFilterOptions"

interface IProps {
  category: string,
  handleCategory: (value: string) => void,
  type: string
}
export function Filter({category, handleCategory, type}: IProps){
  return (
    <div className="flex justify-end items-center text-main pr-4 sm:pr-8 gap-2">
      <p className="font-bold">Filtro: </p>
      <select name="category" id="category" value={category}
        onChange={(e)=>handleCategory(e.target.value)}
        className="border border-main rounded-xl p-2"
      >
        {
          type == 'dress'
          ?  <DressesFilterOptions/>
          : <AccessoriesFilterOptions/>
        }
      </select>
    </div>
  )
}