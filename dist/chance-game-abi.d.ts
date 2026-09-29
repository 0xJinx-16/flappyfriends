export declare const CHANCE_GAME_PROVENANCE: {
    readonly source: "contracts/src/ChanceGame.sol";
    readonly sourceSha256: "df2c3494e9b236e1101760fdda3aa15202d2eadc58b430000c81249f44f460c7";
    readonly sourceKeccak256: "0x749def4d991ac5fadc29bd81996755d6299940d158599b6aa41f3fc40707ea1d";
    readonly compiledSourcesSha256: "49e8fea75d08484c5bcc69ecf26ffca1d98017fbb6475dbc379d4b41a290adf5";
    readonly abiSha256: "5f78a50ff7475d7e01cd77feb14483cbf4fbaa07eb06f679dd74aa5d239c2853";
    readonly compiler: "0.8.36+commit.8a079791";
    readonly compilerSettings: {
        readonly remappings: readonly ["forge-std/=lib/forge-std/src/", "openzeppelin-contracts/=lib/openzeppelin-contracts/contracts/"];
        readonly optimizer: {
            readonly enabled: true;
            readonly runs: 200;
        };
        readonly metadata: {
            readonly bytecodeHash: "none";
            readonly appendCBOR: false;
        };
        readonly compilationTarget: {
            readonly "src/ChanceGame.sol": "ChanceGame";
        };
        readonly evmVersion: "cancun";
        readonly libraries: {};
    };
};
export declare const CHANCE_GAME_ABI: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "rf_";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "generations_";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "entropy_";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "provider_";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "consumableName";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "consumableSymbol";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "price_";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "table";
        readonly type: "tuple[]";
        readonly internalType: "struct ChanceGame.Outcome[]";
        readonly components: readonly [{
            readonly name: "chanceBps";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }, {
            readonly name: "reward";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "metadataURI";
            readonly type: "string";
            readonly internalType: "string";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "CALLBACK_GAS_LIMIT";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint32";
        readonly internalType: "uint32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "_entropyCallback";
    readonly inputs: readonly [{
        readonly name: "sequenceNumber";
        readonly type: "uint64";
        readonly internalType: "uint64";
    }, {
        readonly name: "provider_";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "randomNumber";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "balanceOf";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "id";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "balanceOfBatch";
    readonly inputs: readonly [{
        readonly name: "accounts";
        readonly type: "address[]";
        readonly internalType: "address[]";
    }, {
        readonly name: "ids";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "buy";
    readonly inputs: readonly [{
        readonly name: "friendId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "quantity";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "canBuy";
    readonly inputs: readonly [{
        readonly name: "quantity";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "consumable";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract Consumable";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "entropy";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract IDiceEntropy";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "freeStake";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "fund";
    readonly inputs: readonly [{
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "generations";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract IChanceGenerations";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "isApprovedForAll";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "operator";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "maxPrize";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "outcomeCount";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "outcomeForRoll";
    readonly inputs: readonly [{
        readonly name: "roll";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "outcomes";
    readonly inputs: readonly [{
        readonly name: "outcomeId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "chanceBps";
        readonly type: "uint16";
        readonly internalType: "uint16";
    }, {
        readonly name: "reward";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "metadataURI";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "pendingPlays";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "play";
    readonly inputs: readonly [{
        readonly name: "friendId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "quantity";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "firstPlayId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "batchId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "playCount";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "plays";
    readonly inputs: readonly [{
        readonly name: "playId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "friendId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "batchId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "outcomeId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "price";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "provider";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "randomness";
    readonly inputs: readonly [{
        readonly name: "batchId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "sequenceNumber";
        readonly type: "uint64";
        readonly internalType: "uint64";
    }, {
        readonly name: "requested";
        readonly type: "bool";
        readonly internalType: "bool";
    }, {
        readonly name: "fulfilled";
        readonly type: "bool";
        readonly internalType: "bool";
    }, {
        readonly name: "word";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "redeem";
    readonly inputs: readonly [{
        readonly name: "friendId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "outcomeId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "quantity";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "requestRandomness";
    readonly inputs: readonly [{
        readonly name: "batchId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "sequenceNumber";
        readonly type: "uint64";
        readonly internalType: "uint64";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "reservedPlays";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "rewardLiability";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "rf";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract IERC20";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "safeBatchTransferFrom";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "ids";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }, {
        readonly name: "values";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }, {
        readonly name: "data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "safeTransferFrom";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "id";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setApprovalForAll";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "approved";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "settle";
    readonly inputs: readonly [{
        readonly name: "playId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "supportsInterface";
    readonly inputs: readonly [{
        readonly name: "interfaceId";
        readonly type: "bytes4";
        readonly internalType: "bytes4";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "team";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "uri";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "withdrawSurplus";
    readonly inputs: readonly [{
        readonly name: "recipient";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "event";
    readonly name: "ApprovalForAll";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "operator";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "approved";
        readonly type: "bool";
        readonly indexed: false;
        readonly internalType: "bool";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Funded";
    readonly inputs: readonly [{
        readonly name: "funder";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Played";
    readonly inputs: readonly [{
        readonly name: "playId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "friendId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "batchId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Purchased";
    readonly inputs: readonly [{
        readonly name: "friendId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "quantity";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "payment";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "RandomnessFulfilled";
    readonly inputs: readonly [{
        readonly name: "batchId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "sequenceNumber";
        readonly type: "uint64";
        readonly indexed: true;
        readonly internalType: "uint64";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "RandomnessRequested";
    readonly inputs: readonly [{
        readonly name: "batchId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "sequenceNumber";
        readonly type: "uint64";
        readonly indexed: true;
        readonly internalType: "uint64";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Redeemed";
    readonly inputs: readonly [{
        readonly name: "friendId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "outcomeId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "quantity";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "payment";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Settled";
    readonly inputs: readonly [{
        readonly name: "playId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "friendId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "outcomeId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "SurplusWithdrawn";
    readonly inputs: readonly [{
        readonly name: "recipient";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "TransferBatch";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "ids";
        readonly type: "uint256[]";
        readonly indexed: false;
        readonly internalType: "uint256[]";
    }, {
        readonly name: "values";
        readonly type: "uint256[]";
        readonly indexed: false;
        readonly internalType: "uint256[]";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "TransferSingle";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "id";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "URI";
    readonly inputs: readonly [{
        readonly name: "value";
        readonly type: "string";
        readonly indexed: false;
        readonly internalType: "string";
    }, {
        readonly name: "id";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "ERC1155InsufficientBalance";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "balance";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "needed";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "tokenId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC1155InvalidApprover";
    readonly inputs: readonly [{
        readonly name: "approver";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC1155InvalidArrayLength";
    readonly inputs: readonly [{
        readonly name: "idsLength";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "valuesLength";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC1155InvalidOperator";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC1155InvalidReceiver";
    readonly inputs: readonly [{
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC1155InvalidSender";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC1155MissingApprovalForAll";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "FriendBoundInventory";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "IncorrectOracleFee";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InsufficientStake";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidBatch";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidConfiguration";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidFriend";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidOutcome";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidPlay";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidQuantity";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidRandomness";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NotFriendController";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NotFriendWallet";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "OnlyTeam";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "RandomnessAlreadyRequested";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "RandomnessPending";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ReentrancyGuardReentrantCall";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "SafeERC20FailedOperation";
    readonly inputs: readonly [{
        readonly name: "token";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "UnauthorizedRandomness";
    readonly inputs: readonly [];
}];
