import { BaseObjectModel, LangRequestModel, PageRequestModel, SearchRequestModel, SortRequestModel } from '@scaleo/core/data';

export type MultiSelectBlockQueryParamsType = BaseObjectModel & PageRequestModel & SortRequestModel & LangRequestModel & SearchRequestModel;
