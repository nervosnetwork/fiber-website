---
layout: ../../../layouts/DocLayout.astro
title: Basic Transfer Example
description: Learn how to set up and execute transfers between two nodes
---

## Overview

This guide walks you through setting up and executing a basic token ([CKB](https://explorer.nervos.org/)) transfer between two nodes on the Fiber Testnet. This is a fundamental example that demonstrates the core functionality of the Fiber Channel Network.

## Prerequisites

- [Git](https://git-scm.com/) (if building from source)
- [Rust](https://www.rust-lang.org/) and [Cargo](https://doc.rust-lang.org/cargo/) (if building from source)
- Basic understanding of command line operations
- [curl](https://curl.se/) or similar HTTP client for making RPC calls
- [ckb-cli](https://github.com/nervosnetwork/ckb-cli) for generating keys

## Setting Up Your Nodes

### 1. Prepare Fiber Binary

Download the latest release binary from the [Fiber GitHub Releases](https://github.com/nervosnetwork/fiber/releases) page.

If you prefer to build the binary by yourself, you will need to install [Rust](https://www.rust-lang.org/) and [Cargo](https://doc.rust-lang.org/cargo/):

```sh
git clone https://github.com/nervosnetwork/fiber.git
cd fiber
cargo build --release
```

This document used the [v0.5.0 binary](https://github.com/nervosnetwork/fiber/releases/tag/v0.5.0) throughout the guide.

### 2. Create Data Directories

Set up separate directories for each node:

```sh
# For Node 1
mkdir node1
cp target/release/fnn node1/
cp config/testnet/config.yml node1/

# For Node 2
mkdir node2
cp target/release/fnn node2/
cp config/testnet/config.yml node2/
```

### 3. Configure Node Keys

Each node needs its **own private key** for signing transactions:

```sh
# In each node directory
mkdir ckb
# Use ckb-cli to export or generate keys
ckb-cli account export --lock-arg <lock_arg> --extended-privkey-path ./ckb/exported-key
head -n 1 ./ckb/exported-key > ./ckb/key
```

You can get Testnet funds from faucets (Both nodes need): [https://faucet.nervos.org](https://faucet.nervos.org/).

### 4. Configure Ports

Edit the `config.yml` files to use different ports for each node:

- Node 1: RPC Port 8227, P2P Port 8228
- Node 2: RPC Port 8237, P2P Port 8238

Below is an example of the `config.yml` file, take a note on the `listening_addr` and `rpc -> listening_addr` fields:

<details>
<summary>View complete config.yml</summary>

```sh
# This configuration file only contains the necessary configurations for the testnet deployment.
# All options' descriptions can be found via `fnn --help` and be overridden by command line arguments or environment variables.
fiber:
  listening_addr: "/ip4/127.0.0.1/tcp/8228"
  bootnode_addrs:
    - "/ip4/54.179.226.154/tcp/8228/p2p/Qmes1EBD4yNo9Ywkfe6eRw9tG1nVNGLDmMud1xJMsoYFKy"
    - "/ip4/54.179.226.154/tcp/18228/p2p/QmdyQWjPtbK4NWWsvy8s69NGJaQULwgeQDT5ZpNDrTNaeV"
  announce_listening_addr: true
  announced_addrs:
    # If you want to announce your fiber node public address to the network, you need to add the address here, please change the ip to your public ip accordingly.
    # - "/ip4/YOUR-FIBER-NODE-PUBLIC-IP/tcp/8228"
  chain: testnet
  # lock script configurations related to fiber network
  # https://github.com/nervosnetwork/fiber-scripts/blob/main/deployment/testnet/migrations/2025-02-28-111246.json
  scripts:
    - name: FundingLock
      script:
        code_hash: 0x6c67887fe201ee0c7853f1682c0b77c0e6214044c156c7558269390a8afa6d7c
        hash_type: type
        args: 0x
      cell_deps:
        - type_id:
            code_hash: 0x00000000000000000000000000000000000000000000000000545950455f4944
            hash_type: type
            args: 0x3cb7c0304fe53f75bb5727e2484d0beae4bd99d979813c6fc97c3cca569f10f6
        - cell_dep:
            out_point:
              tx_hash: 0x5a5288769cecde6451cb5d301416c297a6da43dc3ac2f3253542b4082478b19b # ckb_auth
              index: 0x0
            dep_type: code
    - name: CommitmentLock
      script:
        code_hash: 0x740dee83f87c6f309824d8fd3fbdd3c8380ee6fc9acc90b1a748438afcdf81d8
        hash_type: type
        args: 0x
      cell_deps:
        - type_id:
            code_hash: 0x00000000000000000000000000000000000000000000000000545950455f4944
            hash_type: type
            args: 0xf7e458887495cf70dd30d1543cad47dc1dfe9d874177bf19291e4db478d5751b
        - cell_dep:
            out_point:
              tx_hash: 0x5a5288769cecde6451cb5d301416c297a6da43dc3ac2f3253542b4082478b19b #ckb_auth
              index: 0x0
            dep_type: code

rpc:
  # By default RPC only binds to localhost, thus it only allows accessing from the same machine.
  # Allowing arbitrary machines to access the JSON-RPC port is dangerous and strongly discouraged.
  # Please strictly limit the access to only trusted machines.
  listening_addr: "127.0.0.1:8227"

ckb:
  rpc_url: "https://testnet.ckbapp.dev/"
  udt_whitelist:
    - name: RUSD
      script:
        code_hash: 0x1142755a044bf2ee358cba9f2da187ce928c91cd4dc8692ded0337efa677d21a
        hash_type: type
        args: 0x878fcc6f1f08d48e87bb1c3b3d5083f23f8a39c5d5c764f253b55b998526439b
      cell_deps:
        - type_id:
            code_hash: 0x00000000000000000000000000000000000000000000000000545950455f4944
            hash_type: type
            args: 0x97d30b723c0b2c66e9cb8d4d0df4ab5d7222cbb00d4a9a2055ce2e5d7f0d8b0f
      auto_accept_amount: 1000000000

services:
  - fiber
  - rpc
  - ckb
```

</details>

## Step-by-Step Transfer Process

### 1. Start Both Nodes

```sh
# Start Node 1
cd node1
RUST_LOG=info ./fnn -c config.yml -d .

# Start Node 2 (in a different terminal)
cd node2
RUST_LOG=info ./fnn -c config.yml -d .
```

### 2. Connect the Nodes

Establish a connection from Node 1 to Node 2:

```sh
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "42",
    "jsonrpc": "2.0",
    "method": "connect_peer",
    "params": [
      {"address": "/ip4/127.0.0.1/tcp/8238/p2p/QmcFpUnjRvMyqbFBTn94wwF8LZodvPWpK39Wg9pYr2i4TQ"}
    ]
  }' http://localhost:8227
```

Noticed that you need to replace the `QmcFpUnjRvMyqbFBTn94wwF8LZodvPWpK39Wg9pYr2i4TQ` with the your actual peer ID of Node 2.

### 3. Open a Payment Channel

Create a payment channel from Node 1 to Node 2:

```sh
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "42",
    "jsonrpc": "2.0",
    "method": "open_channel",
    "params": [{
      "peer_id": "QmcFpUnjRvMyqbFBTn94wwF8LZodvPWpK39Wg9pYr2i4TQ",
      "funding_amount": "0xba43b7400",
      "commitment_delay_epoch": "0x20001000003"
    }]
  }' http://localhost:8227
```

Noticed that in the `funding_amount` we pass `0xba43b7400` which is `500` CKB. This is the amount of CKB that will be locked in the channel, which also means the maximum amount of CKB that can be transferred from Node 1 to Node 2(single direction) through the channel.

By default, Fiber Node will auto accept the channel. But it still needs some time for the channel to be opened. You can check the channel status by the following command:

```sh
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "42",
    "jsonrpc": "2.0",
    "method": "list_channels",
    "params": [{
      "peer_id": "QmcFpUnjRvMyqbFBTn94wwF8LZodvPWpK39Wg9pYr2i4TQ"
    }]
  }' http://localhost:8227
```

You will get the channel id and a `state_name` field in the response, it will be `CHANNEL_READY` if the channel is opened.

### 4. Generate an Invoice

Next, let's create a payment invoice on Node 2 for 100 CKB. An invoice is a payment request that can be paid by the payer. You can think of it as a paycheck/bill.

```sh
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "42",
    "jsonrpc": "2.0",
    "method": "new_invoice",
    "params": [{
      "amount": "0x2540be400",
      "currency": "Fibt",
      "description": "test invoice generated by node2",
      "expiry": "0xe10",
      "payment_preimage": "0x26b069707aec100fd7153f26abe2bea9e32ed0a6ec1b7e3dcd47aa0e684a1412",
      "hash_algorithm": "sha256"
    }]
  }' http://localhost:8237
```

Some explanations on the parameters:

- `amount` is the amount of CKB to be paid. `0x2540be400` is `100` CKB.
- `expiry` is the expiry time of the invoice in seconds.
- `payment_preimage` is a 32-byte random number represented in hexadecimal. Each invoice has a unique payment preimage. You can generate it using the following command:

```sh
payment_preimage="0x$(openssl rand -hex 32)"
```

 Once the request is sent, you can get the invoice ID from the response:

```sh
{
  "id": "42",
  "jsonrpc": "2.0",
  "result": "fibt100000000001p..."
}
```

### 5. Make the Payment

Now, let's send payment from Node 1 to Node 2 using the generated invoice:

```sh
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "42",
    "jsonrpc": "2.0",
    "method": "send_payment",
    "params": [{
      "invoice": "fibt100000000001p..."  # Use the invoice string from step 4
    }]
  }' http://localhost:8227
```

### 6. Verify the Transfer

Check the channel balance to confirm the transfer:

```sh
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "42",
    "jsonrpc": "2.0",
    "method": "list_channels",
    "params": [{
      "peer_id": "QmcFpUnjRvMyqbFBTn94wwF8LZodvPWpK39Wg9pYr2i4TQ"
    }]
  }' http://localhost:8227
```

In the response, you will get local and remote balance of the channel. It should be updated after the payment is sent.

## Closing the Channel

When you're done with the payment channel, you can close it:

```sh
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "42",
    "jsonrpc": "2.0",
    "method": "shutdown_channel",
    "params": [{
      "channel_id": "0xcc0b319e3b1155196a4ffc6c2f71205493befee742f9bdd3ef0e11db4a9bbdac",
      "close_script": {
        "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        "hash_type": "type",
        "args": "0x4d4ae843f62f05bf1ac601b3dbd43b5b4f9a006a"
      },
      "fee_rate": "0x3FC"
    }]
  }' http://localhost:8227
```

Once the channel is successfully closed, there will be a layer 1 transaction on the chain to reclaim the locked CKB. The multiple off-chain payments between the two nodes are also settled in this layer 1 transaction. You can check the transaction details in [CKB Testnet Explorer](https://testnet.explorer.nervos.org/).

## Important Notes

- Keep track of your channel IDs and peer IDs
- Monitor your node logs for any errors or important messages
- Make sure to properly close channels when they're no longer needed 

## Next Steps

Now you know how to transfer CKB between two nodes in the Fiber network. You can try to transfer more CKB or try to transfer other tokens that are supported by the Fiber network.

Check out the [Transfer Stablecoin](/docs/getting-started/transfer-stablecoin) guide for more details.
