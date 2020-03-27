import { IContract } from './contract.model';
/**
 * Based on Swagger docs currently available @ http://portainer.ring.cloud:3000/api
 */

import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractsService extends BaseService<IContract> {
  constructor(http: HttpClient) {
    super(http, 'contracts');
  }

}
