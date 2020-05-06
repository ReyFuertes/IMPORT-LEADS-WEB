import * as fromContract from '../reducers/contract.reducer';
import * as fromContractProducts from '../reducers/products.reducer';
import * as fromContractCategory from '../reducers/category.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/app.reducer';

export interface ContractModuleState {
  contract: fromContract.ContractsState;
  contractProduct: fromContractProducts.ProductsState;
  contractCategory: fromContractCategory.ContractCategoryState
}

export const reducers: ActionReducerMap<ContractModuleState> = {
  contract: fromContract.ContractsReducer,
  contractProduct: fromContractProducts.ContractProductsReducer,
  contractCategory: fromContractCategory.ContractCategoryReducer
};

export interface AppState extends fromRoot.AppState {
  contractsModule: ContractModuleState;
}


