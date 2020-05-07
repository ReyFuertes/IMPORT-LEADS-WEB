export interface ITag {
  id?: string;
  name: string;
  questions?: ITagQuestion[];
}

export interface ITagQuestion {
  id?: string;
  question_name?: string;
}
