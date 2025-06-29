import { contracts, type ZkBadgePrivateState } from '@midnight-ntwrk/contract';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

// Get the dynamic contract module
const getContractModule = () => {
  const contractNames = Object.keys(contracts);
  if (contractNames.length === 0) {
    throw new Error('No contract found in contracts object');
  }
  return contracts[contractNames[0]];
};

const contractModule = getContractModule();

export type { ZkBadgePrivateState };
export type CounterCircuits = ImpureCircuitId<typeof contractModule.Contract>;

export const ZkBadgePrivateStateId = 'ZkBadgePrivateState';

export type CounterProviders = MidnightProviders<CounterCircuits, typeof ZkBadgePrivateStateId, ZkBadgePrivateState>;

export type CounterContract = typeof contractModule.Contract;

export type DeployedCounterContract = DeployedContract<CounterContract> | FoundContract<CounterContract>;
