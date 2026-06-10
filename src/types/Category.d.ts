interface ICategory {
    _id?: string;
  name: string;
  description: string;
  icon: string;
}

interface ICategoryForm extends ICategory {
    icon: FileList;
}

export { ICategory, ICategoryForm };
