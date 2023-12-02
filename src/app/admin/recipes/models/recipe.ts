
export interface IRecipe {
    id: number,
    name: string,
    price: number,
    description: string,
    imagePath : string,
    tag:ITag,
    category:ICategorey[] ,
    creationDate: string,
    modificationDate: string,
  
  }
  export interface ICategorey {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string,
  }
  export interface ITag {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string,
  }
  export interface IRecipeData {
    pageNumber: number,
    pageSize: number,
    data: IRecipe[],
    totalNumberOfRecords: number,
    totalNumberOfPages: number
  }
