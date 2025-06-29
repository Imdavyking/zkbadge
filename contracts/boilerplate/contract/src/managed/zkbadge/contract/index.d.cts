import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum STATUS { Pending = 0, Verified = 1 }

export enum STATE { vacant = 0, occupied = 1 }

export type Certificate = { issuer: ZswapCoinPublicKey;
                            issued_at: bigint;
                            valid_until: bigint;
                            is_valid: boolean;
                            owner: ZswapCoinPublicKey
                          };

export type ZswapCoinPublicKey = { bytes: Uint8Array };

export type CoinInfo = { nonce: Uint8Array; color: Uint8Array; value: bigint };

export type Maybe<a> = { is_some: boolean; value: a };

export type Witnesses<T> = {
  user_certificate(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Certificate];
}

export type ImpureCircuits<T> = {
  verify_certificates(context: __compactRuntime.CircuitContext<T>,
                      hashes_0: Maybe<Uint8Array>[]): __compactRuntime.CircuitResults<T, []>;
  register(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  check_verification(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, boolean>;
  access_private_feature(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
  cert_hash(cert_0: Certificate): Uint8Array;
}

export type Circuits<T> = {
  verify_certificates(context: __compactRuntime.CircuitContext<T>,
                      hashes_0: Maybe<Uint8Array>[]): __compactRuntime.CircuitResults<T, []>;
  register(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  check_verification(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, boolean>;
  access_private_feature(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  cert_hash(context: __compactRuntime.CircuitContext<T>, cert_0: Certificate): __compactRuntime.CircuitResults<T, Uint8Array>;
}

export type Ledger = {
  readonly admin: ZswapCoinPublicKey;
  registered_hashes: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): STATUS;
    [Symbol.iterator](): Iterator<[Uint8Array, STATUS]>
  };
  verified_users: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: ZswapCoinPublicKey): boolean;
    lookup(key_0: ZswapCoinPublicKey): boolean;
    [Symbol.iterator](): Iterator<[ZswapCoinPublicKey, boolean]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
