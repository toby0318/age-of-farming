import Web3 from "web3";
import { BatchRequest } from "web3-core";

import { getWeb3 } from "./web3";

export class PromisifyBatchRequest<R> {
  web3: Web3;

  batch: BatchRequest;

  requests: Array<Promise<R>> = [];

  constructor() {
    this.web3 = getWeb3();
    this.batch = new this.web3.BatchRequest();
  }

  add = (_request: any, ...params: any) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const request: Promise<R> = new Promise((resolve, reject) => {
      that.batch.add(
        // eslint-disable-next-line consistent-return
        _request.request(null, (err: any, data: R) => {
          if (err) return reject(err);
          resolve(data);
        })
      );
    });
    this.requests.push(request);
  };

  execute = async () => {
    this.batch.execute();
    // eslint-disable-next-line no-return-await
    return await Promise.all(this.requests);
  };
}

const p = 1000;

export default p;
