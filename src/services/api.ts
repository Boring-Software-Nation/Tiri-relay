/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Account {
  /** The account's ID */
  id?: PublicKey;
  /** Whether the account has been cleanly shutdown. If not, the account will require a sync with the host. */
  cleanShutdown?: boolean;
  /** The host's public key */
  hostKey?: PublicKey;
  /** The account's balance as expected by the worker */
  balance?: Currency;
  /** The accumulated drift between the worker's expected balance and the host's actual balance. Used to track if a host is trying to cheat the renter over time. */
  drift?: SignedCurrency;
  /**
   * The owner of the account that manages it. This is the id of the worker that maintains the account.
   * @minLength 1
   */
  owner?: string;
  /** Whether the account requires a sync with the host. This is usually the case when the host reports insufficient balance for an account that the worker still believes to be funded. */
  requiresSync?: boolean;
}

/** The hash of a set of UnlockConditions */
export type Address = Hash256;

export interface Alert {
  /** The alert's ID */
  id?: Hash256;
  /** The severity of the alert */
  severity?: 'info' | 'warning' | 'error' | 'critical';
  /** The alert's message */
  message?: string;
  /** Arbitrary data providing additional context for the alert */
  date?: object;
  /**
   * The time the alert was created
   * @format date-time
   */
  timestamp?: string;
}

export interface Attestation {
  /** A ed25519 public key */
  publicKey?: PublicKey;
  key?: string;
  /** @format byte */
  value?: string;
  /** A ed25519 signature */
  signature?: Signature;
}

export interface Block {
  /** The ID of the parent block */
  parentID?: BlockID;
  /**
   * The nonce used to mine the block
   * @format uint64
   */
  nonce?: number;
  /**
   * The time the block was mined
   * @format date-time
   */
  timestamp?: string;
  minerPayouts?: SiacoinOutput[];
  transactions?: Transaction[];
  v2?: V2BlockData;
}

/** A unique identifier for a block */
export type BlockID = Hash256;

export interface ChainIndex {
  /** The height of the block in the blockchain */
  height?: BlockHeight;
  /** The ID of the block */
  id?: BlockID;
}

export interface ContractMetadata {
  /** The unique identifier for the file contract. */
  id?: FileContractID;
  /** The public key of the host. */
  hostKey?: PublicKey;
  /** Indicates if the contract is a V2 contract. */
  v2?: boolean;
  /** The height at which the storage proof needs to be submitted */
  proofHeight?: BlockHeight;
  /** The ID of the contract this one was renewed from */
  renewedFrom?: FileContractID;
  /** The block height of the latest revision */
  revisionHeight?: BlockHeight;
  /** The current revision number of the contract */
  revisionNumber?: RevisionNumber;
  /**
   * The size of the contract in bytes
   * @format uint64
   */
  size?: number;
  /** The block height at which the contract created */
  startHeight?: BlockHeight;
  /** The state of the contract */
  state?: 'pending' | 'active' | 'complete' | 'failed';
  /** The usability status of the contract */
  usability?: 'good' | 'bad';
  /** The block height when the contract's proof window starts. */
  windowStart?: BlockHeight;
  /** The block height when the contract's proof window ends. */
  windowEnd?: BlockHeight;
  /** The price of forming the contract. */
  contractPrice?: Currency;
  /** The initial funds provided by the renter. */
  initialRenterFunds?: Currency;
  /** Costs and spending details of the contract. */
  spending?: ContractSpending;
  /** The reason for archiving the contract, if applicable. */
  archivalReason?: 'renewed' | 'removed' | 'hostpruned';
  /** The ID of the contract this one was renewed to, if applicable. */
  renewedTo?: FileContractID;
}

export interface ContractSpending {
  /** Total amount spent on sector deletions */
  deletions?: Currency;
  /** Total amount spent on funding ephemeral accounts */
  fundAccount?: Currency;
  /** Total amount spent on listing sector roots */
  sectorRoots?: Currency;
  /** Total amount spent on storing sectors */
  uploads?: Currency;
}

export interface CoveredFields {
  /** Whether the whole transaction is covered by the signature */
  wholeTransaction?: boolean;
  siacoinInputs?: number[];
  siacoinOutputs?: number[];
  fileContracts?: number[];
  fileContractRevisions?: number[];
  storageProofs?: number[];
  siafundInputs?: number[];
  siafundOutputs?: number[];
  minerFees?: number[];
  arbitraryData?: number[];
  signatures?: number[];
}

/**
 * An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H).
 * @maxLength 39
 * @pattern ^\d+$
 */
export type Currency = string;

/** A storage agreement between a renter and a host. */
export interface FileContract {
  /**
   * The size of the contract in bytes.
   * @format uint64
   */
  filesize?: number;
  /** The Merkle root of the contract's data. */
  fileMerkleRoot?: Hash256;
  /** The block height when the contract's proof window starts. */
  windowStart?: BlockHeight;
  /** The block height when the contract's proof window ends. */
  windowEnd?: BlockHeight;
  /** The total payout for the contract. */
  payout?: Currency;
  /** List of outputs created if the contract is successfully fulfilled. */
  validProofOutputs?: SiacoinOutput[];
  /** List of outputs created if the contract is not fulfilled. */
  missedProofOutputs?: SiacoinOutput[];
  /** The hash of a set of UnlockConditions */
  unlockHash?: Address;
  /** The revision number of the contract */
  revisionNumber?: RevisionNumber;
}

/**
 * A unique identifier for a file contract
 * @pattern ^fcid:[0-9a-fA-F]{64}$
 */
export type FileContractID = string;

/** Represents a revision to an existing file contract. */
export interface FileContractRevision {
  /** The ID of the parent file contract being revised. */
  parentID?: FileContractID;
  /** The conditions required to unlock the contract for revision. */
  unlockConditions?: UnlockConditions;
  /**
   * The size of the file in bytes after the revision.
   * @format uint64
   */
  filesize?: number;
  /** The updated Merkle root of the file's data. */
  fileMerkleRoot?: Hash256;
  /** The block height when the revised proof window starts. */
  windowStart?: BlockHeight;
  /** The block height when the revised proof window ends. */
  windowEnd?: BlockHeight;
  /** Updated outputs if the revised contract is successfully fulfilled. */
  validProofOutputs?: SiacoinOutput[];
  /** Updated outputs if the revised contract is not fulfilled. */
  missedProofOutputs?: SiacoinOutput[];
  /** The updated hash of the conditions required to unlock the contract funds. */
  unlockHash?: Address;
  /** The revision number of the contract */
  revisionNumber?: RevisionNumber;
}

/**
 * A 256-bit blake2b hash
 * @pattern ^[0-9a-fA-F]{64}$
 */
export type Hash256 = string;

export interface HostPrices {
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  contractPrice?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  collateral?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  storagePrice?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  ingressPrice?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  egressPrice?: Currency;
  /**
   * The height at which the prices were last updated
   * @format uint64
   */
  tipHeight?: number;
  /** @format date-time */
  validUntil?: string;
  /** A ed25519 signature */
  signature?: Signature;
}

/** A detailed price table containing cost and configuration values for a host. */
export interface HostPriceTable {
  /** Unique specifier that identifies this price table. */
  uid?: SettingsID;
  /**
   * Duration (in nanoseconds) for which the host guarantees these prices are valid.
   * @format int64
   * @example 3600000000000
   */
  validity?: number;
  /** The host's current block height. */
  hostblockheight?: BlockHeight;
  /** The cost to fetch a new price table from the host. */
  updatepricetablecost?: Currency;
  /** The cost to fetch the balance of an ephemeral account. */
  accountbalancecost?: Currency;
  /** The cost to fund an ephemeral account on the host. */
  fundaccountcost?: Currency;
  /** The cost to retrieve the latest revision of a contract. */
  latestrevisioncost?: Currency;
  /** The cost of storing a byte of data for a subscription period. */
  subscriptionmemorycost?: Currency;
  /** The cost of a single notification on top of bandwidth charges. */
  subscriptionnotificationcost?: Currency;
  /** The base cost incurred when starting an MDM program. */
  initbasecost?: Currency;
  /** The cost per byte per time for the memory consumed by a program. */
  memorytimecost?: Currency;
  /** The cost per byte for download bandwidth. */
  downloadbandwidthcost?: Currency;
  /** The cost per byte for upload bandwidth. */
  uploadbandwidthcost?: Currency;
  /** The base cost of performing a DropSectors instruction. */
  dropsectorsbasecost?: Currency;
  /** The unit cost per sector for performing a DropSectors instruction. */
  dropsectorsunitcost?: Currency;
  /** The cost for executing the HasSector command. */
  hassectorbasecost?: Currency;
  /** The base cost of performing a Read instruction. */
  readbasecost?: Currency;
  /** The cost per byte read during a Read instruction. */
  readlengthcost?: Currency;
  /** The cost for renewing a contract. */
  renewcontractcost?: Currency;
  /** The base cost for performing a Revision command. */
  revisionbasecost?: Currency;
  /** The cost of swapping two full sectors by root. */
  swapsectorcost?: Currency;
  /** The base cost per write operation. */
  writebasecost?: Currency;
  /** The cost per byte written during a Write instruction. */
  writelengthcost?: Currency;
  /** The cost per byte/block of additional storage. */
  writestorecost?: Currency;
  /** The minimum recommended transaction fee. */
  txnfeeminrecommended?: Currency;
  /** The maximum recommended transaction fee. */
  txnfeemaxrecommended?: Currency;
  /** The additional fee charged by the host to form or renew a contract. */
  contractprice?: Currency;
  /** The cost per byte for the collateral promised by the host. */
  collateralcost?: Currency;
  /** The maximum amount of collateral the host is willing to put into a contract. */
  maxcollateral?: Currency;
  /**
   * Maximum duration (in blocks) for which the host is willing to form a contract.
   * @format uint64
   * @example 14400
   */
  maxduration?: number;
  /**
   * Minimum time (in blocks) requested for the renew window of a contract.
   * @format uint64
   * @example 1000
   */
  windowsize?: number;
  /**
   * The remaining number of registry entries available on the host.
   * @format uint64
   * @example 5000
   */
  registryentriesleft?: number;
  /**
   * The total number of registry entries available on the host.
   * @format uint64
   * @example 10000
   */
  registryentriestotal?: number;
}

export interface HostSettings {
  /** Whether the host is accepting new contracts */
  acceptingContracts?: boolean;
  /**
   * Maximum allowed download batch size
   * @format uint64
   */
  maxDownloadBatchSize?: number;
  /**
   * Maximum allowed contract duration
   * @format uint64
   */
  maxDuration?: number;
  /**
   * Maximum allowed revision batch size
   * @format uint64
   */
  maxReviseBatchSize?: number;
  /** Network address of the host */
  netAddress?: string;
  /**
   * Amount of storage the host has remaining
   * @format uint64
   */
  remainingStorage?: number;
  /**
   * Size of a storage sector
   * @format uint64
   */
  sectorSize?: number;
  /**
   * Total amount of storage space
   * @format uint64
   */
  totalStorage?: number;
  /** The hash of a set of UnlockConditions */
  address?: Address;
  /**
   * Size of the proof window
   * @format uint64
   */
  windowSize?: number;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  collateral?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  maxCollateral?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  baseRPCPrice?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  contractPrice?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  downloadBandwidthPrice?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  sectorAccessPrice?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  storagePrice?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  uploadBandwidthPrice?: Currency;
  /**
   * Duration before an ephemeral account expires
   * @format int64
   */
  ephemeralAccountExpiry?: number;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  maxEphemeralAccountBalance?: Currency;
  /** The revision number of the contract */
  revisionNumber?: RevisionNumber;
  /** Version of the host software */
  version?: string;
  /**
   * Release tag of the host software
   * @example "hostd 1.0.0"
   */
  release?: string;
  /** Port used for siamux connections */
  siamuxPort?: string;
}

export interface HostV2Settings {
  /** Represents a semantic version as an array of three unsigned 8-bit integers: [major, minor, patch] */
  protocolVersion?: SemVer;
  /**
   * Release tag of the host software
   * @example "hostd 1.0.0"
   */
  release?: string;
  /** The hash of a set of UnlockConditions */
  walletAddress?: Address;
  /** Whether the host is accepting new contracts */
  acceptingContracts?: boolean;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  maxCollateral?: Currency;
  /**
   * Maximum allowed contract duration
   * @format uint64
   */
  maxContractDuration?: number;
  /**
   * Amount of storage the host has remaining
   * @format uint64
   */
  remainingStorage?: number;
  /**
   * Total amount of storage space
   * @format uint64
   */
  totalStorage?: number;
  prices?: HostPrices;
}

/**
 * A ed25519 public key
 * @pattern ^ed25519:[0-9a-fA-F]{64}$
 */
export type PublicKey = string;

export interface SatisfiedPolicy {
  policy?: object;
  signature?: Signature[];
  preimages?: string[];
}

export interface SiacoinElement {
  /** The ID of the element */
  id?: SiacoinOutputID;
  /** The state of the element */
  stateElement?: StateElement;
  /** The output of the element */
  siafundOutput?: SiacoinOutput;
  /** The block height when the output matures */
  maturityHeight?: BlockHeight;
}

export interface SiacoinInput {
  /** The ID of the output being spent */
  parentID?: SiacoinOutputID;
  /** The unlock conditions required to spend the output */
  unlockConditions?: UnlockConditions;
}

export interface SiacoinOutput {
  /** The amount of Siacoins in the output */
  value?: Currency;
  /** The hash of a set of UnlockConditions */
  address?: Address;
}

/** Unique identifier for a Siacoin output. */
export type SiacoinOutputID = Hash256;

export interface SiafundElement {
  /** The ID of the element */
  id?: SiafundOutputID;
  /** The state of the element */
  stateElement?: StateElement;
  /** The output of the element */
  siafundOutput?: SiafundOutput;
  /** value of SiafundTaxRevenue when element was created */
  claimStart?: Currency;
}

/** Represents an input used to spend an unspent Siafund output. */
export interface SiafundInput {
  /** The ID of the parent Siafund output being spent. */
  parentID?: SiafundOutputID;
  /** The conditions required to unlock the parent Siafund output. */
  unlockConditions?: UnlockConditions;
  /** The address receiving the Siacoin claim generated by the Siafund output. */
  claimAddress?: Address;
}

/** Represents an output created to distribute Siafund. */
export interface SiafundOutput {
  /**
   * The amount of Siafund in the output.
   * @format uint64
   */
  value?: number;
  /** The address receiving the Siafund. */
  address?: Address;
}

/** Unique identifier for a Siafund output. */
export type SiafundOutputID = Hash256;

/**
 * A ed25519 signature
 * @format byte
 * @pattern [0-9a-fA-F]{64}
 */
export type Signature = string;

/**
 * A signed amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H).
 * @maxLength 39
 * @pattern ^-?\d+$
 */
export type SignedCurrency = string;

export interface StateElement {
  /**
   * The index of the element in the Merkle tree
   * @format uint64
   */
  leafIndex?: number;
  /** The Merkle proof demonstrating the inclusion of the leaf */
  merkleProof?: Hash256[];
}

/** Represents a proof of storage for a file contract. */
export interface StorageProof {
  /** The ID of the file contract being proven. */
  parentID?: FileContractID;
  /**
   * The selected leaf from the Merkle tree of the file's data.
   * @format byte
   */
  leaf?: string;
  /** The Merkle proof demonstrating the inclusion of the leaf. */
  proof?: Hash256[];
}

export interface Transaction {
  /** List of Siacoin inputs used in the transaction. */
  siacoinInputs?: SiacoinInput[];
  /** List of Siacoin outputs created by the transaction. */
  siacoinOutputs?: SiacoinOutput[];
  /** List of file contracts created by the transaction. */
  fileContracts?: FileContract[];
  /** List of revisions to existing file contracts included in the transaction. */
  fileContractRevisions?: FileContractRevision[];
  /** List of storage proofs asserting the storage of data for file contracts. */
  storageProofs?: StorageProof[];
  /** List of Siafund inputs spent in the transaction. */
  siafundInputs?: SiafundInput[];
  /** List of Siafund outputs created by the transaction. */
  siafundOutputs?: SiafundOutput[];
  /** List of miner fees included in the transaction. */
  minerFees?: Currency[];
  /** Arbitrary binary data included in the transaction. */
  arbitraryData?: string[];
  /** List of cryptographic signatures verifying the transaction. */
  signatures?: TransactionSignature[];
}

/** Unique identifier for a transaction. */
export type TransactionID = Hash256;

export interface TransactionSignature {
  /** The ID of the transaction being signed */
  parentID?: Hash256;
  /**
   * The index of the public key used to sign the transaction
   * @format uint64
   */
  publicKeyIndex?: number;
  /** The block height at which the outputs in the transaction can be spent */
  timelock?: BlockHeight;
  /** Indicates which fields of the transaction are covered by the signature */
  coveredFields?: CoveredFields;
  /** The signature of the transaction */
  signature?: Signature;
}

export interface UnlockConditions {
  /** The block height at which the outputs can be spent */
  timelock?: BlockHeight;
  publicKeys?: UnlockKey[];
  /**
   * The number of signatures required to spend the output
   * @format uint64
   */
  signaturesRequired?: number;
}

export interface UnlockKey {
  /**
   * A fixed 16-byte array that specifies the algorithm used to generate
   * the key
   * @format bytes
   * @example "ed25519"
   */
  algorithm?: string;
  /**
   * A 32-byte key represented as a hex-encoded string. Must be exactly
   * 64 characters long, containing only hexadecimal digits
   * @format bytes
   * @pattern ^[a-fA-F0-9]{64}$
   */
  key?: string;
}

export interface V2BlockData {
  /** The height of the block */
  height?: BlockHeight;
  /** A 256-bit blake2b hash */
  commitment?: Hash256;
  transactions?: V2Transaction[];
}

export interface V2FileContract {
  /** @format uint64 */
  capacity?: number;
  /** @format uint64 */
  filesize?: number;
  /** A 256-bit blake2b hash */
  fileMerkleRoot?: Hash256;
  /** @format uint64 */
  proofHeight?: number;
  /** @format uint64 */
  expirationHeight?: number;
  renterOutput?: SiacoinOutput;
  hostOutput?: SiacoinOutput;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  missedHostValue?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  totalCollateral?: Currency;
  /** A ed25519 public key */
  renterPublicKey?: PublicKey;
  /** A ed25519 public key */
  hostPublicKey?: PublicKey;
  /** The revision number of the contract */
  revisionNumber?: RevisionNumber;
  /** A ed25519 signature */
  renterSignature?: Signature;
  /** A ed25519 signature */
  hostSignature?: Signature;
}

export interface V2FileContractElement {
  /** The ID of the element */
  id?: FileContractID;
  /** The state of the element */
  stateElement?: StateElement;
  v2FileContract?: V2FileContract;
}

export interface V2FileContractResolution {
  parent?: V2FileContractElement;
  resolution?: object;
}

export interface V2FileContractRevision {
  parent?: V2FileContractElement;
  revision?: V2FileContract;
}

export interface V2SiacoinInput {
  parent?: SiacoinElement;
  satisfiedPolicy?: SatisfiedPolicy;
}

export interface V2SiafundInput {
  parent?: SiafundElement;
  /** The hash of a set of UnlockConditions */
  claimAddress?: Address;
  satisfiedPolicy?: SatisfiedPolicy;
}

export interface V2Transaction {
  siacoinInputs?: V2SiacoinInput[];
  siacoinOutputs?: SiacoinOutput[];
  siafundInputs?: V2SiafundInput[];
  siafundOutputs?: SiafundOutput[];
  fileContracts?: V2FileContract[];
  fileContractRevisions?: V2FileContractRevision[];
  fileContractResolutions?: V2FileContractResolution[];
  attestations?: Attestation[];
  arbitraryData?: string[];
  /** The hash of a set of UnlockConditions */
  newFoundationAddress?: Address;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  minerFee?: Currency;
}

export interface AutopilotConfig {
  /** Whether the autopilot is enabled */
  enabled?: boolean;
  contracts?: ContractsConfig;
  hosts?: HostsConfig;
}

/**
 * The height of a block
 * @format uint64
 * @example 92813
 */
export type BlockHeight = number;

export interface Bucket {
  /** The name of the bucket. */
  name?: BucketName;
  policy?: {
    /** Whether the bucket is publicly readable */
    publicReadAccess?: boolean;
  };
  /**
   * The time the bucket was created
   * @format date-time
   */
  createdAt?: string;
}

/**
 * The name of the bucket.
 * @pattern (?!(^xn--|.+-s3alias$))^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$
 * @example "default"
 */
export type BucketName = string;

export interface BuildState {
  /**
   * The build time of the build
   * @format date-time
   */
  buildTime?: string;
  /** The commit hash of the build */
  commit?: string;
  /** The version of the build */
  version?: string;
  /** The operating system of the build */
  os?: string;
}

export interface ConfigRecommendation {
  gougingSettings?: GougingSettings;
}

export interface ConsensusState {
  /** The current block height */
  blockHeight?: BlockHeight;
  /**
   * The time of the last block
   * @format date-time
   */
  lastBlockTime?: string;
  /** Whether the node is synced with the network */
  synced?: boolean;
}

export interface ContractLockID {
  /**
   * The ID of the lock
   * @format uint64
   * @example 12
   */
  lockID?: number;
}

export interface ContractMetric {
  /** @format date-time */
  timestamp?: string;
  /** A unique identifier for a file contract */
  contractID?: FileContractID;
  /** A ed25519 public key */
  hostKey?: PublicKey;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  remainingCollateral?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  remainingFunds?: Currency;
  /** The revision number of the contract */
  revisionNumber?: RevisionNumber;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  deleteSpending?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  fundAccountSpending?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  sectorRootsSpending?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  uploadSpending?: Currency;
}

export interface ContractPruneMetric {
  /** @format date-time */
  timestamp?: string;
  /** A unique identifier for a file contract */
  contractID?: FileContractID;
  /** A ed25519 public key */
  hostKey?: PublicKey;
  hostVersion?: string;
  /** @format uint64 */
  pruned?: number;
  /** @format uint64 */
  remaining?: number;
  /**
   * Duration in nanoseconds
   * @format int64
   */
  duration?: number;
}

export interface ContractsConfig {
  /**
   * The minimum number of contracts to form
   * @format uint64
   * @default 0
   */
  amount?: number;
  /**
   * The length of a contract's period in blocks (1 block being 10 minutes on average)
   * @format uint64
   * @default 0
   */
  period?: number;
  /**
   * The number of blocks before the end of a contract that a contract should be renewed
   * @format uint64
   * @default 0
   */
  renewWindow?: number;
  /**
   * Expected download bandwidth used per period in bytes
   * @format uint64
   * @default 0
   */
  download?: number;
  /**
   * Expected upload bandwidth used per period in bytes
   * @format uint64
   * @default 0
   */
  upload?: number;
  /**
   * Expected amount of data stored in bytes
   * @format uint64
   * @default 0
   */
  storage?: number;
  /**
   * Whether to automatically prune deleted data from contracts
   * @default false
   */
  prune?: boolean;
}

export interface ContractSize {
  /**
   * The amount of data that can be pruned from a contract
   * @format uint64
   */
  prunable?: number;
  /**
   * The total size of a contract
   * @format uint64
   */
  size?: number;
}

/**
 * A duration in milliseconds
 * @format int64
 * @example 30000
 */
export type DurationMS = number;

/**
 * A key used to encrypt and decrypt data. The key is either a regular key (key) or a salted key (skey). The latter requires a seed to be used for encryption and decryption.
 * @pattern ^(key|skey):[0-9a-fA-F]{64}$
 */
export type EncryptionKey = string;

/**
 * An ETag representing a resource
 * @pattern ^(W/)?".*?"$
 * @example "W/"33a64df551425fcc55e4d42a148795d9f25f89d4""
 */
export type ETag = string;

/** A transaction or other event that affects the wallet including miner payouts, siafund claims, and file contract payouts. */
export interface Event {
  /** The event's ID */
  id?: Hash256;
  /** Information about the block that triggered the creation of this event */
  index?: ChainIndex;
  /**
   * The number of blocks on top of the block that triggered the creation of this event
   * @format uint64
   */
  confirmations?: number;
  /** The type of the event */
  type?:
    | 'miner'
    | 'foundation'
    | 'siafundClaim'
    | 'v1Transaction'
    | 'v1ContractResolution'
    | 'v2Transaction'
    | 'v2ContractResolution';
  data?: object;
  /** The block height at which the payout matures. */
  maturityHeight?: BlockHeight;
  /**
   * The time the event was created
   * @format date-time
   */
  timestamp?: string;
  relevant?: Address[];
}

export interface GougingParams {
  consensusState?: ConsensusState;
  gougingSettings?: GougingSettings;
  redundancySettings?: RedundancySettings;
}

export interface GougingSettings {
  /** The maximum base price a host can charge per RPC */
  maxRPCPrice?: Currency;
  /** The maximum price a host can charge for a contract formation */
  maxContractPrice?: Currency;
  /** The maximum price a host can charge for downloading in hastings / byte */
  maxDownloadPrice?: Currency;
  /** The maximum price a host can charge for uploading in hastings / byte */
  maxUploadPrice?: Currency;
  /** The maximum price a host can charge for storage in hastings / byte / block */
  maxStoragePrice?: Currency;
  /**
   * The number of blocks a host's chain's height can diverge from our own before we stop using it
   * @format uint32
   */
  hostBlockHeightLeeway?: number;
  /**
   * The time a host's price table should be valid after acquiring it in milliseconds
   * @format uint64
   */
  minPriceTableValidity?: number;
  /**
   * The minimum amount of time an account on a host can be idle for before expiring
   * @format uint64
   */
  minAccountExpiry?: number;
  /** The minimum max balance a host should allow us to fund an account with */
  minMaxEphemeralAccountBalance?: Currency;
}

export interface GougingSettingsPins {
  maxDownload?: Pin;
  maxStorage?: Pin;
  maxUpload?: Pin;
}

export interface HostsConfig {
  /**
   * The maximum number of consecutive scan failures before a host is removed from the database
   * @format uint64
   * @default 0
   */
  maxConsecutiveScanFailures?: number;
  /**
   * The maximum number of hours a host can be offline before it is removed from the database
   * @format uint64
   * @default 0
   */
  maxDowntimeHours?: number;
  /** The minimum supported protocol version of a host to be considered good */
  minProtocolVersion?: string;
}

export interface Host {
  /**
   * The time the host was first seen
   * @format date-time
   */
  knownSince?: string;
  /**
   * The time the host last announced itself
   * @format date-time
   */
  lastAnnouncement?: string;
  /** A ed25519 public key */
  publicKey?: PublicKey;
  /**
   * The address of the host
   * @example "foo.bar:1234"
   */
  netAddress?: string;
  /** A detailed price table containing cost and configuration values for a host. */
  priceTable?: HostPriceTable;
  settings?: HostSettings;
  v2Settings?: HostV2Settings;
  interactions?: HostInteractions;
  /** Whether the host has been scanned */
  scanned?: boolean;
  /** Whether the host is blocked */
  blocked?: boolean;
  checks?: HostChecks;
  /**
   * The amount of data stored on the host in bytes
   * @format uint64
   */
  storedData?: number;
  v2SiamuxAddresses?: string[];
}

export interface HostChecks {
  gougingBreakdown?: HostGougingBreakdown;
  scoreBreakdown?: HostScoreBreakdown;
  usabilityBreakdown?: HostUsabilityBreakdown;
}

export interface HostGougingBreakdown {
  /** Error message related to download gouging checks. */
  downloadErr?: string;
  /** Error message related to general gouging checks. */
  gougingErr?: string;
  /** Error message related to pruning checks. */
  pruneErr?: string;
  /** Error message related to upload gouging checks. */
  uploadErr?: string;
}

export interface HostInfo {
  /** A ed25519 public key */
  publicKey?: PublicKey;
  /**
   * The address of the host
   * @example "foo.bar:1234"
   */
  siamuxAddr?: string;
  v2SiamuxAddresses?: string[];
}

export interface HostInteractions {
  /**
   * The total number of scans performed on the host.
   * @format uint64
   */
  totalScans?: number;
  /**
   * Timestamp of the last scan performed.
   * @format date-time
   */
  lastScan?: string;
  /** Indicates whether the last scan was successful. */
  lastScanSuccess?: boolean;
  /**
   * Number of sectors lost since the last reporting period.
   * @format uint64
   */
  lostSectors?: number;
  /** Indicates whether the second-to-last scan was successful. */
  secondToLastScanSuccess?: boolean;
  /**
   * Total uptime duration of the host.
   * @format duration
   */
  uptime?: string;
  /**
   * Total downtime duration of the host.
   * @format duration
   */
  downtime?: string;
  /**
   * The number of successful interactions with the host.
   * @format float
   */
  successfulInteractions?: number;
  /**
   * The number of failed interactions with the host.
   * @format float
   */
  failedInteractions?: number;
}

export interface HostScoreBreakdown {
  /**
   * Score contribution based on the host's age.
   * @format float
   */
  age?: number;
  /**
   * Score contribution based on the host's collateral amount.
   * @format float
   */
  collateral?: number;
  /**
   * Score contribution based on successful interactions.
   * @format float
   */
  interactions?: number;
  /**
   * Score contribution based on remaining storage capacity.
   * @format float
   */
  storageRemaining?: number;
  /**
   * Score contribution based on host uptime.
   * @format float
   */
  uptime?: number;
  /**
   * Score contribution based on the host's software version.
   * @format float
   */
  version?: number;
  /**
   * Score contribution based on pricing metrics.
   * @format float
   */
  prices?: number;
}

export interface HostUsabilityBreakdown {
  /** Indicates if the host is blocked. */
  blocked?: boolean;
  /** Indicates if the host is offline. */
  offline?: boolean;
  /** Indicates if the host has a low maximum contract duration. */
  lowMaxDuration?: boolean;
  /** Indicates if the host has a low score. */
  lowScore?: boolean;
  /** Indicates if the host's IP address is redundant. */
  redundantIP?: boolean;
  /** Indicates if the host is gouging prices. */
  gouging?: boolean;
  /** Indicates if the host is not accepting new contracts. */
  notAcceptingContracts?: boolean;
  /** Indicates if the host has not been announced on the network. */
  notAnnounced?: boolean;
  /** Indicates if the host is failing to complete scans. */
  notCompletingScan?: boolean;
}

export interface MemoryStatus {
  /**
   * The amount of remaining memory currently available in bytes
   * @format uint64
   * @example 83886080
   */
  available?: number;
  /**
   * The total amount of memory available in bytes
   * @format uint64
   * @min 1
   * @example 1073741824
   */
  total?: number;
}

/**
 * The MIME type of the object
 * @example "text/plain"
 */
export type MimeType = string;

export interface MultipartUpload {
  /** The name of the bucket */
  bucket?: string;
  /** A key used to encrypt and decrypt data. The key is either a regular key (key) or a salted key (skey). The latter requires a seed to be used for encryption and decryption. */
  encryptionKey?: EncryptionKey;
  /** The key of the object */
  key?: string;
  /** The ID of the multipart upload */
  uploadID?: UploadID;
  /**
   * When the upload was created
   * @format date-time
   */
  createdAt?: string;
}

export interface MultipartListPartItem {
  /** The number of this part */
  partNumber?: MultipartPartNumber;
  /**
   * When this part was last modified
   * @format date-time
   */
  lastModified?: string;
  /** An ETag representing a resource */
  eTag?: ETag;
  /**
   * The size of this part in bytes
   * @format int64
   */
  size?: number;
}

export interface MultipartCompletedPart {
  /** The number of this part */
  partNumber?: MultipartPartNumber;
  /** An ETag representing a resource */
  eTag?: ETag;
}

/**
 * The number of this part
 * @min 1
 * @max 10000
 * @example 123
 */
export type MultipartPartNumber = number;

/**
 * A unique identifier for a multipart upload
 * @pattern ^[0-9a-fA-F]{64}$
 * @example "7aaac83c6d553865755286c326e852a68300bebf7feea1b435d61bd3610bf82b"
 */
export type MultipartUploadID = string;

export interface Network {
  /** The name of the network */
  name?: string;
  /** The initial coinbase reward */
  initialCoinbase?: Currency;
  /** The minimum coinbase reward */
  minimumCoinbase?: Currency;
  /** The initial target */
  initialTarget?: BlockID;
  /**
   * The block interval
   * @format uint64
   * @default 600000000000
   */
  blockInterval?: number;
  /**
   * The maturity delay
   * @format uint64
   * @default 144
   */
  maturityDelay?: number;
  hardforkDevAddr?: {
    /** The height of the hardfork */
    height?: BlockHeight;
    /** The old developer address */
    oldAddress?: Address;
    /** The new developer address */
    newAddress?: Address;
  };
  hardforkTax?: {
    /** The height of the hardfork */
    height?: BlockHeight;
  };
  hardforkStorageProof?: {
    /** The height of the hardfork */
    height?: BlockHeight;
  };
  hardforkOak?: {
    /** The height of the hardfork */
    height?: BlockHeight;
    /** The height of the fix */
    fixHeight?: BlockHeight;
    /**
     * The genesis timestamp
     * @format date-time
     * @default "2015-06-06T16:13:20+02:00"
     */
    genesisTimestamp?: string;
  };
  hardforkASIC?: {
    /** The height of the hardfork */
    height?: BlockHeight;
    /**
     * The oak time
     * @format uint64
     */
    oakTime?: number;
    /** The oak target */
    oakTarget?: BlockID;
  };
  hardforkFoundation?: {
    /** The height of the hardfork */
    height?: BlockHeight;
    /** The primary address */
    primaryAddress?: Address;
    /** The failsafe address */
    failsafeAddress?: Address;
  };
  hardforkV2?: {
    /** The height at which V2 consensus types are allowed */
    allowHeight?: BlockHeight;
    /** The height at which V2 consensus types are required */
    requireHeight?: BlockHeight;
  };
}

export type Object = {
  /** User-defined metadata about an object provided through X-Sia-Meta- headers */
  metadata?: ObjectUserMetadata;
} & ObjectMetadata & {
    /** A key used to encrypt and decrypt data. The key is either a regular key (key) or a salted key (skey). The latter requires a seed to be used for encryption and decryption. */
    encryptionKey?: EncryptionKey;
    slabs?: SlabSlice[];
  };

/**
 * @minLength 1
 * @example "folder/file"
 */
export type ObjectKey = string;

export interface ObjectMetadata {
  /** The name of the bucket. */
  bucket?: BucketName;
  /** The ETag of the object */
  etag?: ETag;
  /**
   * The health of the object
   * @format float
   */
  health?: number;
  /**
   * When the object was last modified
   * @format date-time
   */
  modTime?: string;
  /** The key of the object */
  key?: string;
  /**
   * The size of the object in bytes
   * @format int64
   */
  size?: number;
  /** The MIME type of the object */
  mimeType?: string;
}

/** User-defined metadata about an object provided through X-Sia-Meta- headers */
export type ObjectUserMetadata = Record<string, string>;

export interface PackedSlab {
  /**
   * ID of the buffer containing the slab
   * @format uint
   */
  bufferID?: number;
  /**
   * The slab data
   * @format binary
   */
  data?: File;
  /** A key used to encrypt and decrypt data. The key is either a regular key (key) or a salted key (skey). The latter requires a seed to be used for encryption and decryption. */
  encryptionKey?: EncryptionKey;
}

export interface Pin {
  /** Whether pin is enabled */
  pinned?: boolean;
  /**
   * The value of the underlying currency to which the setting is pinned
   * @format float64
   */
  value?: number;
}

export interface PinnedSettings {
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  currency?: Currency;
  /**
   * A percentage between 0 and 1 that determines when the pinned settings are updated based on the exchange rate at the time
   * @format float64
   */
  threshold?: number;
  gougingSettingsPins?: GougingSettingsPins;
}

/**
 * @format int
 * @example 80
 */
export type Priority = number;

export interface RedundancySettings {
  /** The number of data shards a piece of an object gets erasure-coded into */
  minShards?: RedundancySettingsMinShards;
  /** The number of total data shards a piece of an object gets erasure-coded into */
  totalShards?: RedundancySettingsTotalShards;
}

/**
 * The number of data shards a piece of an object gets erasure-coded into
 * @format uint8
 * @min 1
 * @default 10
 */
export type RedundancySettingsMinShards = number;

/**
 * The number of total data shards a piece of an object gets erasure-coded into
 * @format uint8
 * @min 2
 * @default 30
 */
export type RedundancySettingsTotalShards = number;

export interface Revision {
  /** A unique identifier for a file contract */
  contractID?: FileContractID;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  missedHostValue?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  renterFunds?: Currency;
  /** The revision number of the contract */
  revisionNumber?: RevisionNumber;
  /**
   * The size of the contract in bytes
   * @format uint64
   */
  size?: number;
}

/**
 * The revision number of the contract
 * @format uint64
 * @example 246
 */
export type RevisionNumber = number;

/**
 * Represents a semantic version as an array of three unsigned 8-bit integers: [major, minor, patch]
 * @maxItems 3
 * @minItems 3
 * @example [1,2,3]
 */
export type SemVer = number[];

/**
 * A 16-byte unique identifier represented as a hex string.
 * @format byte
 * @example "4d3b2a1c9f8e7d6c5b4a3f2e1d0c9b8a"
 */
export type SettingsID = string;

export interface SlabBuffer {
  /** Whether the slab buffer is complete and ready to upload */
  complete?: boolean;
  /** Name of the buffer on disk */
  filename?: string;
  /**
   * Size of the buffer
   * @format int64
   */
  size?: number;
  /**
   * Maximum size of the buffer
   * @format int64
   */
  maxSize?: number;
  /** Whether the slab buffer is locked for uploading */
  locked?: boolean;
}

/**
 * A 32-byte unique identifier represented as a hex string.
 * @format byte
 * @example "f1e2d3c4b5a697887776665544332211ffeeddccbbaa99887766554433221100"
 */
export type UploadID = string;

/** A slab of data to migrate */
export interface Slab {
  /**
   * @format float
   * @min 0
   * @max 1
   */
  health?: number;
  /** The encryption key used to encrypt the slab's shards */
  encryptionKey?: EncryptionKey;
  /** The number of data shards the slab is split into */
  minShards?: RedundancySettingsMinShards;
}

/** A contiguous region within a slab */
export interface SlabSlice {
  /** A slab of data to migrate */
  slab?: Slab;
  /** @format uint32 */
  offset?: number;
  /** @format uint32 */
  limit?: number;
}

/**
 * The address of the syncer
 * @example "118.92.232.145:9981"
 */
export type SyncerAddress = string;

export interface S3Settings {
  /** S3 access key ID */
  accessKeyID?: string;
  /** S3 secret access key */
  secretAccessKey?: string;
  /** Whether to disable S3 authentication */
  disableAuth?: boolean;
}

export interface UploadedPackedSlab {
  /**
   * ID of the buffer containing the slab
   * @format uint
   */
  bufferID?: number;
  shards?: UploadedSector[];
}

export interface UploadedSector {
  /** A unique identifier for a file contract */
  contractID?: FileContractID;
  /** A 256-bit blake2b hash */
  root?: Hash256;
}

export interface UploadSettings {
  packing?: UploadPackingSettings;
  redundancy?: RedundancySettings;
}

export interface UploadPackingSettings {
  /** Whether upload packing is enabled */
  enabled?: boolean;
  /**
   * Maximum size for slab buffers
   * @format int64
   */
  slabBufferMaxSizeSoft?: number;
}

export interface WalletMetric {
  /** @format date-time */
  timestamp?: string;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  confirmed?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  spendable?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  unconfirmed?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  immature?: Currency;
}

export interface Webhook {
  /** The module this webhook belongs to */
  module?: 'alerts';
  /** The event type this webhook listens for */
  event?: 'dismiss' | 'register';
  /**
   * The URL to send webhook events to
   * @example "https://foo.com:8000/api/events"
   */
  url?: string;
  /** Custom headers to include in webhook requests */
  headers?: Record<string, string>;
}

export interface WebhookEvent {
  /** The module that triggered the event */
  module?: 'alerts';
  /** The type of event that occurred */
  event?: 'dismiss' | 'register';
  /** Event-specific data payload */
  data?: object;
}

export interface WebhookQueueInfo {
  /** The URL of the webhook */
  url?: string;
  /** Number of pending events in queue */
  numPending?: number;
  /**
   * Timestamp of last successful delivery
   * @format date-time
   */
  lastSuccess?: string;
  /**
   * Timestamp of last failed delivery
   * @format date-time
   */
  lastError?: string;
  /** Message from last failed delivery */
  lastErrorMessage?: string;
}

export interface AuthCreateParams {
  /** The duration in milliseconds for which the token will be valid */
  validity: DurationMS;
}

export interface ConfigEvaluateCreatePayload {
  autopilotConfig?: AutopilotConfig;
  gougingSettings?: GougingSettings;
  redundancySettings?: RedundancySettings;
}

export type ConfigEvaluateCreateError = string;

export interface TriggerCreatePayload {
  /**
   * If true, the autopilot force a new batch of host scans even if it recently scanned the hosts.
   * @default false
   */
  forceScan?: boolean;
}

export type AccountResetdriftCreateError = string;

/** @format binary */
export type MultipartUpdatePayload = File;

export interface MultipartUpdateParams {
  /** The name of the bucket the multipart upload belongs to */
  bucket: BucketName;
  /** The ID of the ongoing multipart upload */
  uploadid: MultipartUploadID;
  /** The part number of the part being uploaded */
  partnumber: MultipartPartNumber;
  /** Used to override the minimum number of shards the part should be split into. */
  minshards?: RedundancySettingsMinShards;
  /** Used to override the total number of shards the part should be split into. */
  totalshards?: RedundancySettingsTotalShards;
  /**
   * The offset of the part within the final object. This is required unless the upload was explicitly created to not be encrypted before erasure coding.
   * @format uint64
   */
  encryptionoffset?: number;
  /** The key of the file to upload */
  key: ObjectKey;
}

export interface ObjectDetailParams {
  /** The name of the bucket the object belongs to */
  bucket: BucketName;
  /** The key of the file to download */
  key: ObjectKey;
}

export type ObjectDetailError = string;

/** @format binary */
export type ObjectUpdatePayload = File;

export interface ObjectUpdateParams {
  /** The name of the bucket the object belongs to */
  bucket: BucketName;
  /** Used to override the minimum number of shards the object should be split into. */
  minshards?: RedundancySettingsMinShards;
  /** Used to override the total number of shards the object should be split into. */
  totalshards?: RedundancySettingsTotalShards;
  /** The MIME type of the object */
  mimetype?: MimeType;
  /** The key of the file to upload */
  key: ObjectKey;
}

export interface ObjectDeleteParams {
  /** The name of the bucket the object belongs to */
  bucket: BucketName;
  /** The key of the file to delete */
  key: ObjectKey;
}

export interface ObjectsRemoveCreatePayload {
  /** The name of the bucket the objects belong to */
  bucket?: BucketName;
  /** The prefix of the objects to delete */
  prefix?: ObjectKey;
}

export type ObjectsRemoveCreateError = string;

export interface AccountsListParams1 {
  /** The owner of the account */
  owner?: string;
}

export interface AccountsCreatePayload {
  accounts?: Account[];
}

export type AccountsCreateError = string;

export interface AccountsFundCreatePayload {
  /** The ID of the account to fund. */
  accountID?: PublicKey;
  /** The amount to fund the account with. */
  amount?: Currency;
  /** The ID of the contract to fund the account with. */
  contractID?: FileContractID;
}

export interface AlertsListParams {
  /**
   * The maximum number of alerts to return
   * @min -1
   * @default -1
   */
  limit?: number;
  /**
   * The number of alerts to skip
   * @min 0
   * @default 0
   */
  offset?: number;
}

export type AlertsListError = string;

export type AlertsDismissCreatePayload = Hash256[];

export interface AlertsRegisterCreatePayload {
  severity?: Alert;
}

export interface AutopilotUpdatePayload {
  /** Whether the autopilot is enabled */
  enabled?: boolean;
  contracts?: ContractsConfig;
  hosts?: HostsConfig;
}

export interface BucketsCreatePayload {
  /** The name of the bucket. */
  name?: BucketName;
  policy?: {
    /** Whether the bucket is publicly readable */
    publicReadAccess?: boolean;
  };
}

export type BucketsCreateError = string;

export interface BucketPolicyUpdatePayload {
  policy?: {
    /** Whether the bucket is publicly readable */
    publicReadAccess?: boolean;
  };
}

export type BucketPolicyUpdateError = string;

export type BucketDeleteError = string;

export interface ContractsListParams {
  /** @default "active" */
  filtermode?: 'active' | 'archived' | 'all' | 'good';
}

export type ContractsListError = string;

export type ContractsArchiveCreatePayload = Record<string, string>;

/** The request body for the POST /contracts endpoint. */
export interface ContractsFormCreatePayload {
  /** The block height at which the contract will end. */
  endHeight?: BlockHeight;
  /** The amount of collateral the host is committing. */
  hostCollateral?: Currency;
  /** The public key of the host. */
  hostKey?: PublicKey;
  /** The funds the renter is committing. */
  renterFunds?: Currency;
  /** The renter's address */
  renterAddress?: Address;
}

export type ContractsFormCreateError = string;

export type ContractsSpendingCreatePayload = {
  /** Total amount spent on sector deletions */
  deletions?: Currency;
  /** Total amount spent on funding ephemeral accounts */
  fundAccount?: Currency;
  /** Total amount spent on listing sector roots */
  sectorRoots?: Currency;
  /** Total amount spent on storing sectors */
  uploads?: Currency;
  /** A unique identifier for a file contract */
  contractID?: FileContractID;
  /** The revision number of the contract */
  revisionNumber?: RevisionNumber;
  /**
   * The size of the contract in bytes
   * @format uint64
   */
  size?: number;
  /** The amount of siacoins that the host will receive if the contract resolves missed */
  missedHostPayout?: Currency;
  /** The amount of siacoins that the renter will receive if the contract resolves valid. */
  validRenterPayout?: Currency;
}[];

export interface ContractAcquireCreatePayload {
  /** The duration of the lock in milliseconds */
  duration?: DurationMS;
  priority?: Priority;
}

export interface ContractAncestorsDetailParams {
  /** @format uint64 */
  minstartheight: number;
  /** A unique identifier for a file contract */
  id: FileContractID;
}

export interface ContractKeepaliveCreatePayload {
  /** The amount of miliseconds to extend the lock by */
  duration?: DurationMS;
  lockID?: ContractLockID;
}

export interface ContractPruneCreatePayload {
  /** A duration in milliseconds */
  timeout?: DurationMS;
}

export interface ContractRenewCreatePayload {
  /** The height at which the contract will expire */
  endHeight?: BlockHeight;
  /** @format uint64 */
  expectedNewStorage?: number;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  minNewCollateral?: Currency;
  /** An unsigned amount of Hastings, the smallest unit of currency in Sia. 1 Siacoin (SC) equals 10^24 Hastings (H). */
  renterFunds?: Currency;
}

export interface ContractReleaseCreatePayload {
  lockID?: ContractLockID;
}

export enum ContractUsabilityUpdatePayload {
  Good = 'good',
  Bad = 'bad',
}

export interface HostsCreatePayload {
  usabilityMode?: 'usable' | 'unusable' | 'all';
  filterMode?: 'allowed' | 'blocked' | 'all';
  /**
   * The number of hosts to skip
   * @min 0
   * @default 0
   */
  offset?: number;
  /**
   * The maximum number of hosts to return
   * @min -1
   * @default -1
   */
  limit?: number;
  /** The host's net address to search for */
  addressContains?: string;
  keyIn?: PublicKey[];
  /** @format date-time */
  maxLastScan?: string;
}

export interface HostsAllowlistUpdatePayload {
  add?: PublicKey[];
  remove?: PublicKey[];
  clear?: boolean;
}

export interface HostsBlocklistUpdatePayload {
  add?: string[];
  remove?: string[];
  clear?: boolean;
}

export interface HostsRemoveCreatePayload {
  maxDowntimeHours?: number;
  maxConsecutiveScanFailures?: number;
}

export type HostsRemoveCreateError = string;

export interface HostScanCreatePayload {
  /** Scan timeout in milliseconds */
  timeout?: DurationMS;
}

export interface MetricDetailParams {
  /**
   * Start time for the metrics query
   * @format date-time
   */
  start: string;
  /**
   * Number of intervals to fetch
   * @min 1
   */
  n: number;
  /** Interval duration in milliseconds */
  interval: DurationMS;
  /** A unique identifier for a file contract */
  contractid?: FileContractID;
  /** A ed25519 public key */
  hostkey?: PublicKey;
  hostversion?: string;
  /** The type of metric to fetch */
  key: 'contract' | 'contractprune' | 'performance' | 'wallet';
}

export type MetricDetailError = string;

export interface MetricUpdatePayload {
  metrics?: ContractPruneMetric[];
}

export type MetricUpdateError = string;

export interface MetricDeleteParams {
  /**
   * Delete metrics older than this timestamp
   * @format date-time
   */
  cutoff: string;
  /** The type of metric to delete */
  key: 'contract' | 'contractprune' | 'performance' | 'wallet';
}

export type MetricDeleteError = string;

export interface MultipartCreateCreatePayload {
  /** The name of the bucket. */
  bucket?: BucketName;
  /** The key of the object to upload */
  key?: ObjectKey;
  /** The MIME type of the object */
  mimeType?: MimeType;
  /** User-defined metadata about an object provided through X-Sia-Meta- headers */
  metadata?: ObjectUserMetadata;
  /**
   * Whether to disable client-side encryption
   * @default false
   */
  disableClientSideEncryption?: boolean;
}

export interface MultipartAbortCreatePayload {
  /** The name of the bucket. */
  bucket?: BucketName;
  key?: ObjectKey;
  /** A unique identifier for a multipart upload */
  uploadID?: MultipartUploadID;
}

export interface MultipartCompleteCreatePayload {
  /** The name of the bucket. */
  bucket?: BucketName;
  key?: ObjectKey;
  /** The ID of the multipart upload */
  uploadID?: UploadID;
  parts?: MultipartCompletedPart[];
  /** User-defined metadata about an object provided through X-Sia-Meta- headers */
  metadata?: ObjectUserMetadata;
}

export interface MultipartPartUpdatePayload {
  /** The name of the bucket. */
  bucket?: BucketName;
  /** An ETag representing a resource */
  eTag?: ETag;
  key?: ObjectKey;
  /** A 32-byte unique identifier represented as a hex string. */
  uploadID?: UploadID;
  /** The number of this part */
  partNumber?: MultipartPartNumber;
  slices?: SlabSlice[];
}

export type MultipartPartUpdateError = string;

export interface MultipartListuploadsCreatePayload {
  /** The name of the bucket. */
  bucket?: BucketName;
  /** Filter uploads by key prefix */
  prefix?: string;
  /** Key to start listing from */
  keyMarker?: string;
  /** Upload ID to start listing from */
  uploadIDMarker?: UploadID;
  /** Maximum number of uploads to return */
  limit?: number;
}

export interface MultipartListpartsCreatePayload {
  /** The name of the bucket. */
  bucket?: BucketName;
  key?: ObjectKey;
  /** The ID of the multipart upload */
  uploadID?: UploadID;
  /** Part number to start listing from */
  partNumberMarker?: number;
  /**
   * Maximum number of parts to return
   * @format int64
   */
  limit?: number;
}

export interface ObjectsDetailParams {
  /** The name of the bucket. */
  bucket: BucketName;
  /** Path delimiter ("/" or empty) */
  delimiter?: string;
  /**
   * Maximum number of objects to return
   * @default -1
   */
  limit?: number;
  /** Key to start listing from */
  marker?: string;
  /** Field to sort results by */
  sortby?: string;
  /** Sort direction (asc/desc) */
  sortdir?: string;
  /** Filter objects by substring */
  substring?: string;
  /** Encryption key for slabs */
  slabencryptionkey?: EncryptionKey;
  /**
   * The prefix to filter objects by
   * @pattern .*
   * @example "folder/"
   */
  prefix: string;
}

export type ObjectsDetailError = string;

export interface ObjectsCopyCreatePayload {
  /** The name of the bucket. */
  sourceBucket?: BucketName;
  /** The name of the bucket. */
  destinationBucket?: BucketName;
  /** The key of the source object */
  sourceKey?: string;
  /** The key for the destination object */
  destinationKey?: string;
  /** The MIME type for the copied object */
  mimeType?: string;
  /** User-defined metadata about an object provided through X-Sia-Meta- headers */
  metadata?: ObjectUserMetadata;
}

export interface ObjectsRemoveCreateBody {
  /** The name of the bucket. */
  bucket?: BucketName;
  /**
   * The prefix of objects to remove
   * @minLength 1
   */
  prefix?: string;
}

export type ObjectsRemoveCreateFail = string;

export interface ObjectsRenameCreatePayload {
  /** The name of the bucket. */
  bucket?: BucketName;
  /** Source path/prefix */
  from?: string;
  /** Destination path/prefix */
  to?: string;
  /** Whether to rename a single object or multiple objects */
  mode?: 'single' | 'multi';
  /** Whether to overwrite existing objects */
  force?: boolean;
}

export type ObjectsRenameCreateError = string;

export interface ObjectDetailParams2 {
  /** The name of the bucket the object is in */
  bucket: BucketName;
  /** If true, only returns object metadata without data */
  onlymetadata?: boolean;
  /** The key of the object to fetch */
  key: ObjectKey;
}

export interface ObjectUpdateBody {
  /** The name of the bucket. */
  bucket?: BucketName;
  /** The ETag of the object */
  eTag?: string;
  /** The MIME type of the object */
  mimeType?: string;
  /** User-defined metadata about an object provided through X-Sia-Meta- headers */
  metadata?: ObjectUserMetadata;
  object?: Object;
}

export interface ObjectDeleteParams2 {
  /** The name of the bucket. */
  bucket: BucketName;
  /** The key of the object to delete */
  key: ObjectKey;
}

export type SettingsPinnedUpdateError = string;

export interface SlabbufferDoneCreatePayload {
  slabs?: UploadedPackedSlab[];
}

export interface SlabbufferFetchCreatePayload {
  /** Duration in milliseconds to lock the slabs */
  lockingDuration?: DurationMS;
  /** The number of data shards a piece of an object gets erasure-coded into */
  minShards?: RedundancySettingsMinShards;
  /** The number of total data shards a piece of an object gets erasure-coded into */
  totalShards?: RedundancySettingsTotalShards;
  /** Maximum number of packed slabs to return */
  limit?: number;
}

export interface SlabsMigrationCreatePayload {
  /**
   * The health cutoff at which slabs are returned for migration
   * @format float64
   */
  healthCutoff?: number;
  /** Maximum number of slabs to return */
  limit?: number;
}

export interface SlabsPartialDetailParams {
  /**
   * Offset within the slab
   * @min 0
   */
  offset: number;
  /**
   * Number of bytes to retrieve
   * @min 1
   */
  length: number;
  /** A key used to encrypt and decrypt data. The key is either a regular key (key) or a salted key (skey). The latter requires a seed to be used for encryption and decryption. */
  key: EncryptionKey;
}

export type SlabsPartialDetailError = string;

/** @format binary */
export type SlabsPartialCreatePayload = File;

export interface SlabsPartialCreateParams {
  /** The number of data shards a piece of an object gets erasure-coded into */
  minshards: RedundancySettingsMinShards;
  /** The number of total data shards a piece of an object gets erasure-coded into */
  totalshards: RedundancySettingsTotalShards;
}

export type SlabsPartialCreateError = string;

export type SlabUpdatePayload = {
  /** A unique identifier for a file contract */
  contractID?: FileContractID;
  /** A 256-bit blake2b hash */
  root?: Hash256;
}[];

/** The address of the syncer to connect to */
export type SyncerConnectCreatePayload = SyncerAddress;

export interface SystemSqlite3BackupCreatePayload {
  /** Which database to backup */
  database?: 'main' | 'metrics';
  /** Path where to save the backup */
  path?: string;
}

export interface StatsObjectsListParams {
  /** Optional bucket to get stats for */
  bucket?: BucketName;
}

export type UploadSectorCreatePayload = Hash256[];

export interface WalletEventsListParams {
  /**
   * The maximum number of events to return
   * @min -1
   * @default -1
   */
  limit?: number;
  /**
   * The number of events to skip
   * @min 0
   * @default 0
   */
  offset?: number;
}

export type WalletEventsListError = string;

export interface WalletRedistributeCreatePayload {
  /**
   * The number of outputs to redistribute the wallet's funds into
   * @format uint64
   */
  outputs?: number;
  /** The value of each output */
  amount?: Currency;
}

export interface WalletSendCreatePayload {
  /** The address to send the siacoins to */
  address?: Address;
  /** The amount of siacoins to send */
  amount?: Currency;
  /** Whether to subtract the miner fee from the amount */
  subtractMinerFee?: boolean;
  /** Whether to use unconfirmed outputs */
  useUnconfirmed?: boolean;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Renterd API
 * @version 2.0.0
 *
 * API that caters to both casual users seeking straightforward data storage and developers requiring a robust API for building apps on Sia
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Creates a new authentication token that is returned via the 'renterd_auth' cookie which is set by the server and the json response body. The token can be used as a cookie or as the 'apikey' query parameter for authentication.
     *
     * @tags authentication
     * @name AuthCreate
     * @summary Create a new authentication token
     * @request POST:/api/auth
     */
    authCreate: (query: AuthCreateParams, params: RequestParams = {}) =>
      this.request<
        {
          /**
           * A hex-encoded string representing the token
           * @pattern ^[a-fA-F0-9]{32}$
           */
          token?: string;
        },
        void
      >({
        path: `/api/auth`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  autopilot = {
    /**
     * @description Evaluates the provided autopilot configuration and returns some information about the hosts that would be considered usable using that configuration. If possible, it also returns a recommendation for a better configuration that would allow for forming contracts with more hosts.
     *
     * @tags autopilot
     * @name ConfigEvaluateCreate
     * @summary Evaluate autopilot configuration
     * @request POST:/autopilot/config/evaluate
     */
    configEvaluateCreate: (data: ConfigEvaluateCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /**
           * Number of hosts available
           * @format uin64
           */
          hosts?: number;
          /**
           * Number of hosts that the autopilot could form contracts with using the provided config
           * @format uint64
           */
          usable?: number;
          unusable?: {
            /**
             * Number of hosts unavailable due to being blocklisted
             * @format uint64
             */
            blocked?: number;
            gouging?: {
              /**
               * Number of hosts that fail the contract gouging checks
               * @format uint64
               */
              contract?: number;
              /**
               * Number of hosts that fail the download gouging checks
               * @format uint64
               */
              download?: number;
              /**
               * Number of hosts that fail the general gouging checks
               * @format uint64
               */
              gouging?: number;
              /**
               * Number of hosts that fail the pruning gouging checks
               * @format uint64
               */
              pruning?: number;
              /**
               * Number of hosts that fail the upload gouging checks
               * @format uint64
               */
              upload?: number;
            };
            /**
             * Number of hosts that have a max contract duration that is too low
             * @format uint64
             */
            lowMaxDuration?: number;
            /**
             * Number of hosts that are not accepting contracts
             * @format uint64
             */
            notAcceptingContracts?: number;
            /**
             * Number of hosts that haven't been successfully scanned yet
             * @format uint64
             */
            notScanned?: number;
          };
          recommendation?: ConfigRecommendation;
        },
        ConfigEvaluateCreateError
      >({
        path: `/autopilot/config/evaluate`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the current state of the autopilot, including migration, pruning, and scanning status.
     *
     * @tags autopilot
     * @name StateList
     * @summary Get the autopilot state
     * @request GET:/autopilot/state
     */
    stateList: (params: RequestParams = {}) =>
      this.request<
        BuildState & {
          /** Whether the autopilot is enabled */
          enabled?: boolean;
          /** Indicates if the autopilot is currently migrating */
          migrating?: boolean;
          /**
           * When migration last started
           * @format date-time
           */
          migratingLastStart?: string;
          /** Indicates if the autopilot is currently pruning */
          pruning?: boolean;
          /**
           * When pruning last started
           * @format date-time
           */
          pruningLastStart?: string;
          /** Indicates if the autopilot is currently scanning */
          scanning?: boolean;
          /**
           * When scanning last started
           * @format date-time
           */
          scanningLastStart?: string;
          /**
           * The autopilot uptime in milliseconds
           * @format int64
           */
          uptimeMs?: number;
          /**
           * When the autopilot was started
           * @format date-time
           */
          startTime?: string;
        },
        any
      >({
        path: `/autopilot/state`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Triggers the autopilot to start an iteration of contract maintenance and host scanning.
     *
     * @tags autopilot
     * @name TriggerCreate
     * @summary Wake up autopilot
     * @request POST:/autopilot/trigger
     */
    triggerCreate: (data: TriggerCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /** Indicates whether the request triggered a new iteration of the maintenance loop. If maintenance was already ongoing, this will be false. */
          triggered?: boolean;
        },
        void
      >({
        path: `/autopilot/trigger`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  worker = {
    /**
     * @description Returns all accounts the worker maintains with hosts for payment.
     *
     * @tags worker
     * @name AccountsList
     * @summary Get all worker accounts
     * @request GET:/worker/accounts
     */
    accountsList: (params: RequestParams = {}) =>
      this.request<Account[], any>({
        path: `/worker/accounts`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the account the worker maintains with the specified host for payment.
     *
     * @tags worker
     * @name AccountDetail
     * @summary Get a worker account
     * @request GET:/worker/account/{hostkey}
     */
    accountDetail: (hostkey: PublicKey, params: RequestParams = {}) =>
      this.request<Account, any>({
        path: `/worker/account/${hostkey}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Resets the drift for the specified account to 0.
     *
     * @tags worker
     * @name AccountResetdriftCreate
     * @summary Reset drift for a worker's account
     * @request POST:/worker/account/{id}/resetdrift
     */
    accountResetdriftCreate: (id: PublicKey, params: RequestParams = {}) =>
      this.request<Account, AccountResetdriftCreateError>({
        path: `/worker/account/${id}/resetdrift`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the memory usage of the worker for both uploads and downloads.
     *
     * @tags worker
     * @name MemoryList
     * @summary Get overview of worker's memory usage.
     * @request GET:/worker/memory
     */
    memoryList: (params: RequestParams = {}) =>
      this.request<
        {
          /** The memory status for downloads */
          download?: MemoryStatus;
          /** The memory status for uploads */
          upload?: MemoryStatus;
        },
        any
      >({
        path: `/worker/memory`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Upload a single part of an ongoing multipart upload. Parts can be uploaded in parallel and then combined afterwards.
     *
     * @tags worker
     * @name MultipartUpdate
     * @summary Upload a part of an ongoing multipart upload
     * @request PUT:/worker/multipart/{key}
     */
    multipartUpdate: (
      { key, ...query }: MultipartUpdateParams,
      data: MultipartUpdatePayload,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/worker/multipart/${key}`,
        method: 'PUT',
        query: query,
        body: data,
        ...params,
      }),

    /**
     * @description Downloads an object from the Sia network.
     *
     * @tags worker
     * @name ObjectDetail
     * @summary Download an object
     * @request GET:/worker/object/{key}
     */
    objectDetail: ({ key, ...query }: ObjectDetailParams, params: RequestParams = {}) =>
      this.request<File, ObjectDetailError>({
        path: `/worker/object/${key}`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Uploads an object to the Sia network.
     *
     * @tags worker
     * @name ObjectUpdate
     * @summary Upload an object
     * @request PUT:/worker/object/{key}
     */
    objectUpdate: ({ key, ...query }: ObjectUpdateParams, data: ObjectUpdatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/worker/object/${key}`,
        method: 'PUT',
        query: query,
        body: data,
        ...params,
      }),

    /**
     * @description Deletes an object from the local database. The object is not removed from the network immediately. Instead, the autopilot prunes data from the network periodically.
     *
     * @tags worker
     * @name ObjectDelete
     * @summary Delete an object
     * @request DELETE:/worker/object/{key}
     */
    objectDelete: ({ key, ...query }: ObjectDeleteParams, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/worker/object/${key}`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * @description Deletes all objects with the provided prefix from the local database. The objects are not removed from the network immediately. Instead, the autopilot prunes data from the network periodically.
     *
     * @tags worker
     * @name ObjectsRemoveCreate
     * @summary Delete a batch of objects with a given prefix
     * @request POST:/worker/objects/remove
     */
    objectsRemoveCreate: (data: ObjectsRemoveCreatePayload, params: RequestParams = {}) =>
      this.request<void, ObjectsRemoveCreateError>({
        path: `/worker/objects/remove`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns general information about the work.
     *
     * @tags worker
     * @name StateList
     * @summary Get the worker's state.
     * @request GET:/worker/state
     */
    stateList: (params: RequestParams = {}) =>
      this.request<
        BuildState & {
          /** The worker's ID */
          id?: string;
          /**
           * When the worker was started
           * @format date-time
           */
          startTime?: string;
        },
        any
      >({
        path: `/worker/state`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the download statistics of the worker.
     *
     * @tags worker
     * @name StatsDownloadsList
     * @summary Get download statistics
     * @request GET:/worker/stats/downloads
     */
    statsDownloadsList: (params: RequestParams = {}) =>
      this.request<
        {
          /**
           * The average download speed in Mbps
           * @format float
           */
          avgDownloadSpeedMbps?: number;
          /**
           * The average overdrive percentage
           * @format float
           */
          avgOverdrivePct?: number;
          /**
           * The number of healthy downloaders
           * @format uint64
           */
          healthyDownloaders?: number;
          /**
           * The total number of downloaders
           * @format uint64
           */
          numDownloaders?: number;
          downloadersStats?: {
            /**
             * The average sector download speed in Mbps
             * @format float
             */
            avgSectorDownloadSpeedMbps?: number;
            /** The host's public key */
            hostKey?: PublicKey;
          }[];
        },
        any
      >({
        path: `/worker/stats/downloads`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the upload statistics of the worker.
     *
     * @tags worker
     * @name StatsUploadsList
     * @summary Get upload statistics
     * @request GET:/worker/stats/uploads
     */
    statsUploadsList: (params: RequestParams = {}) =>
      this.request<
        {
          /**
           * The average upload speed in Mbps
           * @format float
           */
          avgUploadSpeedMbps?: number;
          /**
           * The average overdrive percentage
           * @format float
           */
          avgOverdrivePct?: number;
          /**
           * The number of healthy uploaders
           * @format uint64
           */
          healthyUploaders?: number;
          /**
           * The total number of uploaders
           * @format uint64
           */
          numUploaders?: number;
          uploadersStats?: {
            /**
             * The average sector upload speed in Mbps
             * @format float
             */
            avgSectorUploadSpeedMbps?: number;
            /** The host's public key */
            hostKey?: PublicKey;
          }[];
        },
        any
      >({
        path: `/worker/stats/uploads`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  bus = {
    /**
     * @description Returns all accounts.
     *
     * @tags bus
     * @name AccountsList
     * @summary Get all accounts
     * @request GET:/bus/accounts
     */
    accountsList: (query: AccountsListParams1, params: RequestParams = {}) =>
      this.request<Account[], void>({
        path: `/bus/accounts`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Saves the provided accounts to the database.
     *
     * @tags bus
     * @name AccountsCreate
     * @summary Save accounts
     * @request POST:/bus/accounts
     */
    accountsCreate: (data: AccountsCreatePayload, params: RequestParams = {}) =>
      this.request<void, AccountsCreateError>({
        path: `/bus/accounts`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Funds the specified account with the provided amount.
     *
     * @tags bus
     * @name AccountsFundCreate
     * @summary Fund an account
     * @request POST:/bus/accounts/fund
     */
    accountsFundCreate: (data: AccountsFundCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /** The amount that was deposited into the account */
          deposit?: Currency;
        },
        void
      >({
        path: `/bus/accounts/fund`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns all currently registered alerts.
     *
     * @tags bus
     * @name AlertsList
     * @summary Get all alerts
     * @request GET:/bus/alerts
     */
    alertsList: (query: AlertsListParams, params: RequestParams = {}) =>
      this.request<
        {
          alerts?: Alert[];
          /** Whether there are more alerts to fetch */
          hasMore?: boolean;
          totals?: {
            /**
             * The number of info alerts
             * @format uint64
             */
            info?: number;
            /**
             * The number of warning alerts
             * @format uint64
             */
            warning?: number;
            /**
             * The number of error alerts
             * @format uint64
             */
            error?: number;
            /**
             * The number of critical alerts
             * @format uint64
             */
            critical?: number;
          };
        },
        AlertsListError
      >({
        path: `/bus/alerts`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Dismisses the specified alerts.
     *
     * @tags bus
     * @name AlertsDismissCreate
     * @summary Dismiss alerts
     * @request POST:/bus/alerts/dismiss
     */
    alertsDismissCreate: (data: AlertsDismissCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/alerts/dismiss`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Registers a new alert.
     *
     * @tags bus
     * @name AlertsRegisterCreate
     * @summary Register an alert
     * @request POST:/bus/alerts/register
     */
    alertsRegisterCreate: (data: AlertsRegisterCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/alerts/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns the current autopilot configuration.
     *
     * @tags bus
     * @name AutopilotList
     * @summary Get autopilot configuration
     * @request GET:/bus/autopilot
     */
    autopilotList: (params: RequestParams = {}) =>
      this.request<AutopilotConfig, void>({
        path: `/bus/autopilot`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Updates the autopilot configuration.
     *
     * @tags bus
     * @name AutopilotUpdate
     * @summary Update autopilot configuration
     * @request PUT:/bus/autopilot
     */
    autopilotUpdate: (data: AutopilotUpdatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/autopilot`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns all known buckets.
     *
     * @tags bus
     * @name BucketsList
     * @summary Get all buckets
     * @request GET:/bus/buckets
     */
    bucketsList: (params: RequestParams = {}) =>
      this.request<Bucket[], void>({
        path: `/bus/buckets`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new bucket.
     *
     * @tags bus
     * @name BucketsCreate
     * @summary Create bucket
     * @request POST:/bus/buckets
     */
    bucketsCreate: (data: BucketsCreatePayload, params: RequestParams = {}) =>
      this.request<void, BucketsCreateError>({
        path: `/bus/buckets`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Updates the policy of the specified bucket.
     *
     * @tags bus
     * @name BucketPolicyUpdate
     * @summary Update bucket policy
     * @request PUT:/bus/bucket/{name}/policy
     */
    bucketPolicyUpdate: (name: BucketName, data: BucketPolicyUpdatePayload, params: RequestParams = {}) =>
      this.request<void, BucketPolicyUpdateError>({
        path: `/bus/bucket/${name}/policy`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns the specified bucket.
     *
     * @tags bus
     * @name BucketDetail
     * @summary Get bucket
     * @request GET:/bus/bucket/{name}
     */
    bucketDetail: (name: BucketName, params: RequestParams = {}) =>
      this.request<BucketName, void>({
        path: `/bus/bucket/${name}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Deletes the specified bucket.
     *
     * @tags bus
     * @name BucketDelete
     * @summary Delete bucket
     * @request DELETE:/bus/bucket/{name}
     */
    bucketDelete: (name: BucketName, params: RequestParams = {}) =>
      this.request<void, BucketDeleteError>({
        path: `/bus/bucket/${name}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * @description Accepts a block from the consensus set.
     *
     * @tags bus
     * @name ConsensusAcceptblockCreate
     * @summary Accept block
     * @request POST:/bus/consensus/acceptblock
     */
    consensusAcceptblockCreate: (data: Block, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/consensus/acceptblock`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns various details about the network.
     *
     * @tags bus
     * @name ConsensusNetworkList
     * @summary Get network details
     * @request GET:/bus/consensus/network
     */
    consensusNetworkList: (params: RequestParams = {}) =>
      this.request<Network, any>({
        path: `/bus/consensus/network`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the siafund fee for the specified payout.
     *
     * @tags bus
     * @name ConsensusSiafundfeeDetail
     * @summary Get siafund fee
     * @request GET:/bus/consensus/siafundfee/{payout}
     */
    consensusSiafundfeeDetail: (payout: Currency, params: RequestParams = {}) =>
      this.request<Currency, void>({
        path: `/bus/consensus/siafundfee/${payout}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the current consensus state.
     *
     * @tags bus
     * @name ConsensusStateList
     * @summary Get consensus state
     * @request GET:/bus/consensus/state
     */
    consensusStateList: (params: RequestParams = {}) =>
      this.request<ConsensusState, void>({
        path: `/bus/consensus/state`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractsList
     * @summary Get all contracts
     * @request GET:/bus/contracts
     */
    contractsList: (query: ContractsListParams, params: RequestParams = {}) =>
      this.request<ContractMetadata[], ContractsListError>({
        path: `/bus/contracts`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractsUpdate
     * @summary Add a contract
     * @request PUT:/bus/contracts
     */
    contractsUpdate: (data: ContractMetadata, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/contracts`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractsAllDelete
     * @summary Archives all contracts
     * @request DELETE:/bus/contracts/all
     */
    contractsAllDelete: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/contracts/all`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractsArchiveCreate
     * @summary Archive contracts
     * @request POST:/bus/contracts/archive
     */
    contractsArchiveCreate: (data: ContractsArchiveCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/contracts/archive`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractsFormCreate
     * @summary Form a new contract
     * @request POST:/bus/contracts/form
     */
    contractsFormCreate: (data: ContractsFormCreatePayload, params: RequestParams = {}) =>
      this.request<ContractMetadata, ContractsFormCreateError>({
        path: `/bus/contracts/form`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractsPrunableList
     * @summary Get prunable contract data
     * @request GET:/bus/contracts/prunable
     */
    contractsPrunableList: (params: RequestParams = {}) =>
      this.request<
        {
          /** A list of prunable contracts with their size information. */
          contracts?: ContractSize[];
          /**
           * The total prunable size across all contracts in bytes
           * @format uint64
           */
          totalPrunable?: number;
          /**
           * The total size of all contracts in bytes
           * @format uint64
           */
          totalSize?: number;
        },
        any
      >({
        path: `/bus/contracts/prunable`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractsRenewedDetail
     * @summary Get renewed contract
     * @request GET:/bus/contracts/renewed/{id}
     */
    contractsRenewedDetail: (id: FileContractID, params: RequestParams = {}) =>
      this.request<ContractMetadata, void>({
        path: `/bus/contracts/renewed/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractsSpendingCreate
     * @summary Record contract spending
     * @request POST:/bus/contracts/spending
     */
    contractsSpendingCreate: (data: ContractsSpendingCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/contracts/spending`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractDetail
     * @summary Get contract by ID
     * @request GET:/bus/contract/{id}
     */
    contractDetail: (id: FileContractID, params: RequestParams = {}) =>
      this.request<ContractMetadata, void>({
        path: `/bus/contract/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractDelete
     * @summary Archive contract with archival reason 'removed'
     * @request DELETE:/bus/contract/{id}
     */
    contractDelete: (id: FileContractID, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/contract/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractAcquireCreate
     * @summary Acquire contract lock
     * @request POST:/bus/contract/{id}/acquire
     */
    contractAcquireCreate: (id: FileContractID, data: ContractAcquireCreatePayload, params: RequestParams = {}) =>
      this.request<ContractLockID, any>({
        path: `/bus/contract/${id}/acquire`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractAncestorsDetail
     * @summary Get contract ancestors
     * @request GET:/bus/contract/{id}/ancestors
     */
    contractAncestorsDetail: ({ id, ...query }: ContractAncestorsDetailParams, params: RequestParams = {}) =>
      this.request<ContractMetadata[], void>({
        path: `/bus/contract/${id}/ancestors`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractBroadcastCreate
     * @summary Broadcast contract's revision
     * @request POST:/bus/contract/{id}/broadcast
     */
    contractBroadcastCreate: (id: FileContractID, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/contract/${id}/broadcast`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractKeepaliveCreate
     * @summary Keep contract lock alive
     * @request POST:/bus/contract/{id}/keepalive
     */
    contractKeepaliveCreate: (id: FileContractID, data: ContractKeepaliveCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/contract/${id}/keepalive`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractRevisionDetail
     * @summary Get latest contract revision
     * @request GET:/bus/contract/{id}/revision
     */
    contractRevisionDetail: (id: FileContractID, params: RequestParams = {}) =>
      this.request<Revision, void>({
        path: `/bus/contract/${id}/revision`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractPruneCreate
     * @summary Prune contract data
     * @request POST:/bus/contract/{id}/prune
     */
    contractPruneCreate: (id: FileContractID, data: ContractPruneCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /**
           * The size of the pruned contract in bytes
           * @format uint64
           */
          size?: number;
          /**
           * The number of bytes pruned
           * @format uint64
           */
          pruned?: number;
          /**
           * The number of prunable bytes remaining
           * @format uint64
           */
          remaining?: number;
          /** An error message if the prune failed */
          error?: string;
        },
        void
      >({
        path: `/bus/contract/${id}/prune`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractRenewCreate
     * @summary Renew contract
     * @request POST:/bus/contract/{id}/renew
     */
    contractRenewCreate: (id: FileContractID, data: ContractRenewCreatePayload, params: RequestParams = {}) =>
      this.request<ContractMetadata, any>({
        path: `/bus/contract/${id}/renew`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractReleaseCreate
     * @summary Release contract lock
     * @request POST:/bus/contract/{id}/release
     */
    contractReleaseCreate: (id: FileContractID, data: ContractReleaseCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/contract/${id}/release`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractRootsDetail
     * @summary Get contract sector roots
     * @request GET:/bus/contract/{id}/roots
     */
    contractRootsDetail: (id: FileContractID, params: RequestParams = {}) =>
      this.request<Hash256[], any>({
        path: `/bus/contract/${id}/roots`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractSizeDetail
     * @summary Get contract size
     * @request GET:/bus/contract/{id}/size
     */
    contractSizeDetail: (id: FileContractID, params: RequestParams = {}) =>
      this.request<ContractSize, void>({
        path: `/bus/contract/${id}/size`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name ContractUsabilityUpdate
     * @summary Update contract usability
     * @request PUT:/bus/contract/{id}/usability
     */
    contractUsabilityUpdate: (id: FileContractID, data: ContractUsabilityUpdatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/contract/${id}/usability`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns a list of hosts that pass the gouging checks
     *
     * @tags bus
     * @name HostsList
     * @summary Get usable hosts
     * @request GET:/bus/hosts
     */
    hostsList: (params: RequestParams = {}) =>
      this.request<HostInfo[], void>({
        path: `/bus/hosts`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns a filtered list of hosts based on specified criteria
     *
     * @tags bus
     * @name HostsCreate
     * @summary Search hosts using filters
     * @request POST:/bus/hosts
     */
    hostsCreate: (data: HostsCreatePayload, params: RequestParams = {}) =>
      this.request<Host[], void>({
        path: `/bus/hosts`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the list of allowed host public keys
     *
     * @tags bus
     * @name HostsAllowlistList
     * @summary Get host allowlist
     * @request GET:/bus/hosts/allowlist
     */
    hostsAllowlistList: (params: RequestParams = {}) =>
      this.request<PublicKey[], void>({
        path: `/bus/hosts/allowlist`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Updates the list of allowed host public keys
     *
     * @tags bus
     * @name HostsAllowlistUpdate
     * @summary Update host allowlist
     * @request PUT:/bus/hosts/allowlist
     */
    hostsAllowlistUpdate: (data: HostsAllowlistUpdatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/hosts/allowlist`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns the list of blocked host net addresses
     *
     * @tags bus
     * @name HostsBlocklistList
     * @summary Get host blocklist
     * @request GET:/bus/hosts/blocklist
     */
    hostsBlocklistList: (params: RequestParams = {}) =>
      this.request<string[], void>({
        path: `/bus/hosts/blocklist`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Updates the list of blocked host public keys
     *
     * @tags bus
     * @name HostsBlocklistUpdate
     * @summary Update host blocklist
     * @request PUT:/bus/hosts/blocklist
     */
    hostsBlocklistUpdate: (data: HostsBlocklistUpdatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/hosts/blocklist`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Removes hosts that have been offline for the specified duration
     *
     * @tags bus
     * @name HostsRemoveCreate
     * @summary Remove offline hosts
     * @request POST:/bus/hosts/remove
     */
    hostsRemoveCreate: (data: HostsRemoveCreatePayload, params: RequestParams = {}) =>
      this.request<BlockHeight, HostsRemoveCreateError>({
        path: `/bus/hosts/remove`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns detailed information about a specific host
     *
     * @tags bus
     * @name HostDetail
     * @summary Get host details
     * @request GET:/bus/host/{hostkey}
     */
    hostDetail: (hostkey: PublicKey, params: RequestParams = {}) =>
      this.request<HostInfo, void>({
        path: `/bus/host/${hostkey}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Updates host checks for a specific host
     *
     * @tags bus
     * @name HostCheckUpdate
     * @summary Update host check
     * @request PUT:/bus/host/{hostkey}/check
     */
    hostCheckUpdate: (hostkey: PublicKey, data: HostChecks, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/host/${hostkey}/check`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Resets the lost sectors counter for a specific host
     *
     * @tags bus
     * @name HostResetlostsectorsCreate
     * @summary Reset lost sectors
     * @request POST:/bus/host/{hostkey}/resetlostsectors
     */
    hostResetlostsectorsCreate: (hostkey: PublicKey, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/host/${hostkey}/resetlostsectors`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description Performs a scan of the host to check its settings and availability
     *
     * @tags bus
     * @name HostScanCreate
     * @summary Scan host
     * @request POST:/bus/host/{hostkey}/scan
     */
    hostScanCreate: (hostkey: PublicKey, data: HostScanCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /** Round trip time in milliseconds */
          ping?: DurationMS;
          scanError?: string;
          settings?: HostSettings;
          /** A detailed price table containing cost and configuration values for a host. */
          priceTable?: HostPriceTable;
          v2Settings?: HostV2Settings;
        },
        void
      >({
        path: `/bus/host/${hostkey}/scan`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name MetricDetail
     * @summary Get metrics
     * @request GET:/bus/metric/{key}
     */
    metricDetail: ({ key, ...query }: MetricDetailParams, params: RequestParams = {}) =>
      this.request<(ContractMetric | ContractPruneMetric | WalletMetric)[], MetricDetailError>({
        path: `/bus/metric/${key}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name MetricUpdate
     * @summary Record metrics
     * @request PUT:/bus/metric/{key}
     */
    metricUpdate: (
      key: 'contract' | 'contractprune' | 'performance' | 'wallet',
      data: MetricUpdatePayload,
      params: RequestParams = {},
    ) =>
      this.request<void, MetricUpdateError>({
        path: `/bus/metric/${key}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bus
     * @name MetricDelete
     * @summary Delete metrics
     * @request DELETE:/bus/metric/{key}
     */
    metricDelete: ({ key, ...query }: MetricDeleteParams, params: RequestParams = {}) =>
      this.request<void, MetricDeleteError>({
        path: `/bus/metric/${key}`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * @description Creates a new multipart upload and returns an upload ID.
     *
     * @tags bus
     * @name MultipartCreateCreate
     * @summary Create a multipart upload
     * @request POST:/bus/multipart/create
     */
    multipartCreateCreate: (data: MultipartCreateCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /** The ID of the multipart upload */
          uploadID?: UploadID;
        },
        void
      >({
        path: `/bus/multipart/create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Aborts an ongoing multipart upload and removes any uploaded parts.
     *
     * @tags bus
     * @name MultipartAbortCreate
     * @summary Abort a multipart upload
     * @request POST:/bus/multipart/abort
     */
    multipartAbortCreate: (data: MultipartAbortCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/multipart/abort`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Completes a multipart upload by combining all uploaded parts into a single object.
     *
     * @tags bus
     * @name MultipartCompleteCreate
     * @summary Complete a multipart upload
     * @request POST:/bus/multipart/complete
     */
    multipartCompleteCreate: (data: MultipartCompleteCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /** The ETag of the completed object */
          eTag?: string;
        },
        void
      >({
        path: `/bus/multipart/complete`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Adds a part to an ongoing multipart upload.
     *
     * @tags bus
     * @name MultipartPartUpdate
     * @summary Upload a part of a multipart upload
     * @request PUT:/bus/multipart/part
     */
    multipartPartUpdate: (data: MultipartPartUpdatePayload, params: RequestParams = {}) =>
      this.request<void, MultipartPartUpdateError>({
        path: `/bus/multipart/part`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns details about an ongoing multipart upload.
     *
     * @tags bus
     * @name MultipartUploadDetail
     * @summary Get multipart upload details
     * @request GET:/bus/multipart/upload/{id}
     */
    multipartUploadDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** The name of the bucket. */
          bucket?: BucketName;
          /** The encryption key used for this upload */
          encryptionKey?: EncryptionKey;
          /** The key of the object */
          key?: string;
          /** The ID of the multipart upload */
          uploadID?: UploadID;
          /**
           * When the upload was created
           * @format date-time
           */
          createdAt?: string;
        },
        void
      >({
        path: `/bus/multipart/upload/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Lists all ongoing multipart uploads.
     *
     * @tags bus
     * @name MultipartListuploadsCreate
     * @summary List multipart uploads
     * @request POST:/bus/multipart/listuploads
     */
    multipartListuploadsCreate: (data: MultipartListuploadsCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /** Whether there are more uploads to fetch */
          hasMore?: boolean;
          /** The key marker for the next page of results */
          nextMarker?: string;
          /** The upload ID marker for the next page of results */
          nextUploadIDMarker?: UploadID;
          uploads?: {
            /** The name of the bucket */
            bucket?: string;
            /** The encryption key used for this upload */
            encryptionKey?: string;
            /** The key of the object */
            key?: string;
            /** The ID of the multipart upload */
            uploadID?: UploadID;
            /**
             * When the upload was created
             * @format date-time
             */
            createdAt?: string;
          }[];
        },
        any
      >({
        path: `/bus/multipart/listuploads`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Lists all parts that have been uploaded for a specific multipart upload.
     *
     * @tags bus
     * @name MultipartListpartsCreate
     * @summary List parts of a multipart upload
     * @request POST:/bus/multipart/listparts
     */
    multipartListpartsCreate: (data: MultipartListpartsCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /** Whether there are more parts to fetch */
          hasMore?: boolean;
          /** The part number marker for the next page of results */
          nextMarker?: number;
          parts?: MultipartListPartItem[];
        },
        void
      >({
        path: `/bus/multipart/listparts`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Lists objects with the specified prefix.
     *
     * @tags bus
     * @name ObjectsDetail
     * @summary List objects
     * @request GET:/bus/objects/{prefix}
     */
    objectsDetail: ({ prefix, ...query }: ObjectsDetailParams, params: RequestParams = {}) =>
      this.request<
        {
          objects?: Object[];
          /** Whether there are more objects to fetch */
          hasMore?: boolean;
        },
        ObjectsDetailError
      >({
        path: `/bus/objects/${prefix}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Copies an object from one location to another.
     *
     * @tags bus
     * @name ObjectsCopyCreate
     * @summary Copy object
     * @request POST:/bus/objects/copy
     */
    objectsCopyCreate: (data: ObjectsCopyCreatePayload, params: RequestParams = {}) =>
      this.request<ObjectMetadata, void>({
        path: `/bus/objects/copy`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Removes all objects with the specified prefix.
     *
     * @tags bus
     * @name ObjectsRemoveCreate
     * @summary Remove objects by prefix
     * @request POST:/bus/objects/remove
     */
    objectsRemoveCreate: (data: ObjectsRemoveCreateBody, params: RequestParams = {}) =>
      this.request<void, ObjectsRemoveCreateFail>({
        path: `/bus/objects/remove`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Renames a single object or multiple objects with a prefix.
     *
     * @tags bus
     * @name ObjectsRenameCreate
     * @summary Rename objects
     * @request POST:/bus/objects/rename
     */
    objectsRenameCreate: (data: ObjectsRenameCreatePayload, params: RequestParams = {}) =>
      this.request<void, ObjectsRenameCreateError>({
        path: `/bus/objects/rename`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns an object's metadata or full object data.
     *
     * @tags bus
     * @name ObjectDetail
     * @summary Get object
     * @request GET:/bus/object/{key}
     */
    objectDetail: ({ key, ...query }: ObjectDetailParams2, params: RequestParams = {}) =>
      this.request<Object, void>({
        path: `/bus/object/${key}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Stores or updates an object.
     *
     * @tags bus
     * @name ObjectUpdate
     * @summary Store object
     * @request PUT:/bus/object/{key}
     */
    objectUpdate: (key: ObjectKey, data: ObjectUpdateBody, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/object/${key}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Deletes an object from the bucket.
     *
     * @tags bus
     * @name ObjectDelete
     * @summary Delete object
     * @request DELETE:/bus/object/{key}
     */
    objectDelete: ({ key, ...query }: ObjectDeleteParams2, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/object/${key}`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * @description Returns the current gouging parameters including consensus state, gouging settings, and redundancy settings.
     *
     * @tags bus
     * @name ParamsGougingList
     * @summary Get gouging parameters
     * @request GET:/bus/params/gouging
     */
    paramsGougingList: (params: RequestParams = {}) =>
      this.request<
        {
          consensusState?: {
            /** The height of a block */
            blockHeight?: BlockHeight;
            /**
             * Timestamp of the last block
             * @format date-time
             */
            lastBlockTime?: string;
            /** Whether consensus is synced */
            synced?: boolean;
          };
          gougingSettings?: GougingSettings;
          redundancySettings?: RedundancySettings;
        },
        void
      >({
        path: `/bus/params/gouging`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns parameters needed for uploads including consensus height, gouging parameters and upload packing status.
     *
     * @tags bus
     * @name ParamsUploadList
     * @summary Get upload parameters
     * @request GET:/bus/params/upload
     */
    paramsUploadList: (params: RequestParams = {}) =>
      this.request<
        {
          /** Current consensus height */
          currentHeight?: BlockHeight;
          /** Whether upload packing is enabled */
          uploadPacking?: boolean;
        } & GougingParams,
        void
      >({
        path: `/bus/params/upload`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Marks a sector as lost for a specific host.
     *
     * @tags bus
     * @name SectorsDelete
     * @summary Delete host sector
     * @request DELETE:/bus/sectors/{hostkey}/{root}
     */
    sectorsDelete: (hostkey: PublicKey, root: Hash256, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/sectors/${hostkey}/${root}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * @description Returns the current gouging settings.
     *
     * @tags bus
     * @name SettingsGougingList
     * @summary Get gouging settings
     * @request GET:/bus/settings/gouging
     */
    settingsGougingList: (params: RequestParams = {}) =>
      this.request<GougingSettings, void>({
        path: `/bus/settings/gouging`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Updates the gouging settings.
     *
     * @tags bus
     * @name SettingsGougingUpdate
     * @summary Update gouging settings
     * @request PUT:/bus/settings/gouging
     */
    settingsGougingUpdate: (data: GougingSettings, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/settings/gouging`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns the current pinned settings.
     *
     * @tags bus
     * @name SettingsPinnedList
     * @summary Get pinned settings
     * @request GET:/bus/settings/pinned
     */
    settingsPinnedList: (params: RequestParams = {}) =>
      this.request<PinnedSettings, any>({
        path: `/bus/settings/pinned`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Updates the pinned settings.
     *
     * @tags bus
     * @name SettingsPinnedUpdate
     * @summary Update pinned settings
     * @request PUT:/bus/settings/pinned
     */
    settingsPinnedUpdate: (data: PinnedSettings, params: RequestParams = {}) =>
      this.request<void, SettingsPinnedUpdateError>({
        path: `/bus/settings/pinned`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns the current S3 settings.
     *
     * @tags bus
     * @name SettingsS3List
     * @summary Get S3 settings
     * @request GET:/bus/settings/s3
     */
    settingsS3List: (params: RequestParams = {}) =>
      this.request<S3Settings, void>({
        path: `/bus/settings/s3`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Updates the S3 settings.
     *
     * @tags bus
     * @name SettingsS3Update
     * @summary Update S3 settings
     * @request PUT:/bus/settings/s3
     */
    settingsS3Update: (data: S3Settings, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/settings/s3`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns the current upload settings.
     *
     * @tags bus
     * @name SettingsUploadList
     * @summary Get upload settings
     * @request GET:/bus/settings/upload
     */
    settingsUploadList: (params: RequestParams = {}) =>
      this.request<UploadSettings, void>({
        path: `/bus/settings/upload`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Updates the upload settings.
     *
     * @tags bus
     * @name SettingsUploadUpdate
     * @summary Update upload settings
     * @request PUT:/bus/settings/upload
     */
    settingsUploadUpdate: (data: UploadSettings, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/settings/upload`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns information about all slab buffers.
     *
     * @tags bus
     * @name SlabbuffersList
     * @summary Get slab buffers info
     * @request GET:/bus/slabbuffers
     */
    slabbuffersList: (params: RequestParams = {}) =>
      this.request<SlabBuffer[], void>({
        path: `/bus/slabbuffers`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Marks the specified packed slabs as successfully uploaded.
     *
     * @tags bus
     * @name SlabbufferDoneCreate
     * @summary Mark packed slabs as uploaded
     * @request POST:/bus/slabbuffer/done
     */
    slabbufferDoneCreate: (data: SlabbufferDoneCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/slabbuffer/done`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns packed slabs that are ready to be uploaded.
     *
     * @tags bus
     * @name SlabbufferFetchCreate
     * @summary Fetch packed slabs for upload
     * @request POST:/bus/slabbuffer/fetch
     */
    slabbufferFetchCreate: (data: SlabbufferFetchCreatePayload, params: RequestParams = {}) =>
      this.request<PackedSlab[], void>({
        path: `/bus/slabbuffer/fetch`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns slabs that need to be migrated based on health cutoff.
     *
     * @tags bus
     * @name SlabsMigrationCreate
     * @summary Get slabs for migration
     * @request POST:/bus/slabs/migration
     */
    slabsMigrationCreate: (data: SlabsMigrationCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          slabs?: {
            /** A key used to encrypt and decrypt data. The key is either a regular key (key) or a salted key (skey). The latter requires a seed to be used for encryption and decryption. */
            encryptionKey?: EncryptionKey;
            /**
             * Current health of the slab
             * @format float64
             */
            health?: number;
          }[];
        },
        void
      >({
        path: `/bus/slabs/migration`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieves a portion of a slab's data.
     *
     * @tags bus
     * @name SlabsPartialDetail
     * @summary Get partial slab
     * @request GET:/bus/slabs/partial/{key}
     */
    slabsPartialDetail: ({ key, ...query }: SlabsPartialDetailParams, params: RequestParams = {}) =>
      this.request<File, SlabsPartialDetailError>({
        path: `/bus/slabs/partial/${key}`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Adds data to a partial slab.
     *
     * @tags bus
     * @name SlabsPartialCreate
     * @summary Add partial slab
     * @request POST:/bus/slabs/partial
     */
    slabsPartialCreate: (
      query: SlabsPartialCreateParams,
      data: SlabsPartialCreatePayload,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          slabs?: SlabSlice[];
          /** Whether the slab buffer soft limit was reached */
          slabBufferMaxSizeSoftReached?: boolean;
        },
        SlabsPartialCreateError
      >({
        path: `/bus/slabs/partial`,
        method: 'POST',
        query: query,
        body: data,
        format: 'json',
        ...params,
      }),

    /**
     * @description Recalculates health for all slabs.
     *
     * @tags bus
     * @name SlabsRefreshhealthCreate
     * @summary Refresh slab health
     * @request POST:/bus/slabs/refreshhealth
     */
    slabsRefreshhealthCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/slabs/refreshhealth`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description Returns information about a specific slab.
     *
     * @tags bus
     * @name SlabDetail
     * @summary Get slab
     * @request GET:/bus/slab/{key}
     */
    slabDetail: (key: EncryptionKey, params: RequestParams = {}) =>
      this.request<Slab, void>({
        path: `/bus/slab/${key}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Updates the sectors for a slab.
     *
     * @tags bus
     * @name SlabUpdate
     * @summary Update slab
     * @request PUT:/bus/slab/{key}
     */
    slabUpdate: (key: EncryptionKey, data: SlabUpdatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/slab/${key}`,
        method: 'PUT',
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Returns the address of the syncer.
     *
     * @tags bus
     * @name SyncerAddressList
     * @summary Get the syncer's address
     * @request GET:/bus/syncer/address
     */
    syncerAddressList: (params: RequestParams = {}) =>
      this.request<SyncerAddress, any>({
        path: `/bus/syncer/address`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Connects to the specified syncer.
     *
     * @tags bus
     * @name SyncerConnectCreate
     * @summary Connect to a syncer
     * @request POST:/bus/syncer/connect
     */
    syncerConnectCreate: (data: SyncerConnectCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/syncer/connect`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns the syncer's peers.
     *
     * @tags bus
     * @name SyncerPeersList
     * @summary Get syncer peers
     * @request GET:/bus/syncer/peers
     */
    syncerPeersList: (params: RequestParams = {}) =>
      this.request<SyncerAddress[], any>({
        path: `/bus/syncer/peers`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a backup of the specified SQLite database.
     *
     * @tags bus
     * @name SystemSqlite3BackupCreate
     * @summary Backup SQLite database
     * @request POST:/bus/system/sqlite3/backup
     */
    systemSqlite3BackupCreate: (data: SystemSqlite3BackupCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/system/sqlite3/backup`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns the current state of the bus including version, build info, and explorer status.
     *
     * @tags bus
     * @name StateList
     * @summary Get bus state
     * @request GET:/bus/state
     */
    stateList: (params: RequestParams = {}) =>
      this.request<
        {
          /**
           * When the bus was started
           * @format date-time
           */
          startTime?: string;
          /** Version of renterd */
          version?: string;
          /** Git commit hash of the build */
          commit?: string;
          /** Operating system */
          os?: string;
          /**
           * When this version was built
           * @format date-time
           */
          buildTime?: string;
          explorer?: {
            /** Whether the explorer is enabled */
            enabled?: boolean;
            /** Base URL of the explorer */
            url?: string;
          };
          /** Name of the network (mainnet/testnet) */
          network?: string;
        },
        any
      >({
        path: `/bus/state`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns statistics about objects in a bucket.
     *
     * @tags bus
     * @name StatsObjectsList
     * @summary Get object statistics
     * @request GET:/bus/stats/objects
     */
    statsObjectsList: (query: StatsObjectsListParams, params: RequestParams = {}) =>
      this.request<
        {
          /**
           * Number of objects
           * @format uint64
           */
          numObjects?: number;
          /**
           * Number of unfinished objects
           * @format uint64
           */
          numUnfinishedObjects?: number;
          /**
           * Minimum health of all objects
           * @format float64
           */
          minHealth?: number;
          /**
           * Size of all objects
           * @format uint64
           */
          totalObjectsSize?: number;
          /**
           * Size of all unfinished objects
           * @format uint64
           */
          totalUnfinishedObjectsSize?: number;
          /**
           * Uploaded size of all objects
           * @format uint64
           */
          totalSectorsSize?: number;
          /**
           * Uploaded size of all objects including redundant sectors
           * @format uint64
           */
          totalUploadedSize?: number;
        },
        void
      >({
        path: `/bus/stats/objects`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the recommended fee for a transaction.
     *
     * @tags bus
     * @name TxpoolRecommendedfeeList
     * @summary Get recommended fee
     * @request GET:/bus/txpool/recommendedfee
     */
    txpoolRecommendedfeeList: (params: RequestParams = {}) =>
      this.request<Currency, void>({
        path: `/bus/txpool/recommendedfee`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns all transactions in the transaction pool.
     *
     * @tags bus
     * @name TxpoolTransactionsList
     * @summary Get all transactions
     * @request GET:/bus/txpool/transactions
     */
    txpoolTransactionsList: (params: RequestParams = {}) =>
      this.request<Transaction[], void>({
        path: `/bus/txpool/transactions`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Broadcasts the specified transaction.
     *
     * @tags bus
     * @name TxpoolBroadcastCreate
     * @summary Broadcast transaction
     * @request POST:/bus/txpool/broadcast
     */
    txpoolBroadcastCreate: (data: Transaction, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/txpool/broadcast`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Starts tracking an upload with the given ID.
     *
     * @tags bus
     * @name UploadCreate
     * @summary Track upload
     * @request POST:/bus/upload/{id}
     */
    uploadCreate: (id: UploadID, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/upload/${id}`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description Marks an upload as finished and stops tracking it.
     *
     * @tags bus
     * @name UploadDelete
     * @summary Finish upload
     * @request DELETE:/bus/upload/{id}
     */
    uploadDelete: (id: UploadID, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/upload/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * @description Adds sector roots to a tracked upload.
     *
     * @tags bus
     * @name UploadSectorCreate
     * @summary Add sectors to upload
     * @request POST:/bus/upload/{id}/sector
     */
    uploadSectorCreate: (id: UploadID, data: UploadSectorCreatePayload, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/upload/${id}/sector`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns information about the wallet.
     *
     * @tags bus
     * @name WalletList
     * @summary Get wallet information
     * @request GET:/bus/wallet
     */
    walletList: (params: RequestParams = {}) =>
      this.request<
        {
          /** The amount of spendable siacoins in the wallet */
          spendable?: Currency;
          /** The amount of siacoins that have been confirmed in a block */
          confirmed?: Currency;
          /** The amount of siacoins that have not been confirmed in a block */
          unconfirmed?: Currency;
          /** The amount of siacoins that have yet to mature */
          immature?: Currency;
          /** The wallet's address */
          address?: Address;
          /**
           * The height up until which the wallet is synced
           * @format uint64
           */
          scanHeight?: number;
        },
        void
      >({
        path: `/bus/wallet`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns all events related to the wallet.
     *
     * @tags bus
     * @name WalletEventsList
     * @summary Get wallet events
     * @request GET:/bus/wallet/events
     */
    walletEventsList: (query: WalletEventsListParams, params: RequestParams = {}) =>
      this.request<Event[], WalletEventsListError>({
        path: `/bus/wallet/events`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns all unconfirmed events in the wallet.
     *
     * @tags bus
     * @name WalletPendingList
     * @summary Get unconfirmed events
     * @request GET:/bus/wallet/pending
     */
    walletPendingList: (params: RequestParams = {}) =>
      this.request<Event[], void>({
        path: `/bus/wallet/pending`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Redistributes the wallet's funds into desired number of outputs of requested value.
     *
     * @tags bus
     * @name WalletRedistributeCreate
     * @summary Redistribute wallet funds
     * @request POST:/bus/wallet/redistribute
     */
    walletRedistributeCreate: (data: WalletRedistributeCreatePayload, params: RequestParams = {}) =>
      this.request<TransactionID[], void>({
        path: `/bus/wallet/redistribute`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Sends the specified amount of siacoins to the specified address.
     *
     * @tags bus
     * @name WalletSendCreate
     * @summary Send siacoins
     * @request POST:/bus/wallet/send
     */
    walletSendCreate: (data: WalletSendCreatePayload, params: RequestParams = {}) =>
      this.request<TransactionID, void>({
        path: `/bus/wallet/send`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns all registered webhooks and their queue information.
     *
     * @tags bus
     * @name WebhooksList
     * @summary Get webhooks
     * @request GET:/bus/webhooks
     */
    webhooksList: (params: RequestParams = {}) =>
      this.request<
        {
          queues?: WebhookQueueInfo[];
          webhooks?: Webhook[];
        },
        any
      >({
        path: `/bus/webhooks`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Registers a new webhook.
     *
     * @tags bus
     * @name WebhooksCreate
     * @summary Register webhook
     * @request POST:/bus/webhooks
     */
    webhooksCreate: (data: Webhook, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/webhooks`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Broadcasts a webhook event to registered webhooks.
     *
     * @tags bus
     * @name WebhooksActionCreate
     * @summary Broadcast webhook action
     * @request POST:/bus/webhooks/action
     */
    webhooksActionCreate: (data: WebhookEvent, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/webhooks/action`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Deletes a registered webhook.
     *
     * @tags bus
     * @name WebhookDeleteCreate
     * @summary Delete webhook
     * @request POST:/bus/webhook/delete
     */
    webhookDeleteCreate: (data: Webhook, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/bus/webhook/delete`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
