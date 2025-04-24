---
layout: ../../../layouts/DocLayout.astro
title: "Transfer Stablecoins on Fiber Testnet"
description: Learn how to transfer stablecoins between nodes
---

## Overview

This guide walks you through setting up and executing stablecoin transfers between 3 nodes in the Fiber Testnet. Unlike [native CKB transfers example](/docs/getting-started/basic-transfer), this example demonstrates how to use [User-Defined Tokens (UDTs)](https://docs.nervos.org/docs/tech-explanation/glossary#user-defined-token) in payment channels, specifically focusing on stablecoins like [RUSD](https://testnet0815.stablepp.xyz/stablecoin).

## Prerequisites

- [Git](https://git-scm.com/) (if building from source)
- [Rust](https://www.rust-lang.org/) and [Cargo](https://doc.rust-lang.org/cargo/) (if building from source)
- Basic understanding of command line operations
- [curl](https://curl.se/) or similar HTTP client for making RPC calls
- [ckb-cli](https://github.com/nervosnetwork/ckb-cli) for generating keys

## Setting Up Your Environment

### 1. Prepare Fiber Binary

Download the latest release binary from the [Fiber GitHub Releases](https://github.com/nervosnetwork/fiber/releases) page.

If you prefer to build the binary by yourself, you will need to install [Rust](https://www.rust-lang.org/) and [Cargo](https://doc.rust-lang.org/cargo/):

```sh
git clone https://github.com/nervosnetwork/fiber.git
cd fiber
cargo build --release
cp target/release/fnn ./
```

This document used the [v0.5.0 binary](https://github.com/nervosnetwork/fiber/releases/tag/v0.5.0) throughout the guide.

### 2. Configure Fiber Nodes

We'll set up three nodes for this tutorial. Set up separate directories for each node:

```sh
# For Node 1
mkdir node1
cp target/release/fnn node1/
cp config/testnet/config.yml node1/

# For Node 2
mkdir node2
cp target/release/fnn node2/
cp config/testnet/config.yml node2/

# For Node 3
mkdir node3
cp target/release/fnn node3/
cp config/testnet/config.yml node3/
```

Each node needs its **own private key** for signing transactions:

```sh
# In each node directory
mkdir ckb
# Use ckb-cli to export or generate keys
ckb-cli account export --lock-arg <lock_arg> --extended-privkey-path ./ckb/exported-key
head -n 1 ./ckb/exported-key > ./ckb/key
# Modify key permissions
chmod 600 ./ckb/key
```

Each node requires a different key. You can get Testnet funds from Faucets.
(The RUSD faucet cannot directly fill an address, so you can first claim 20RUSD through a wallet like joyid, then transfer it to nodeA’s address from [the joyid wallet page](https://testnet.joyid.dev/).)

- [https://faucet.nervos.org](https://faucet.nervos.org/) for CKB
- [https://testnet0815.stablepp.xyz/stablecoin](https://testnet0815.stablepp.xyz/stablecoin) for RUSD

### 4. Configure Ports

Edit the `config.yml` files to use different ports for each node:

- Node 1: RPC Port 8227, P2P Port 8228
- Node 2: RPC Port 8237, P2P Port 8238
- Node 3: RPC Port 8247, P2P Port 8248

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

### 3. Start All Nodes

Start each node in a separate terminal:

```sh
# Terminal 1
RUST_LOG=info ./fnn -c node1/config.yml -d node1

# Terminal 2
RUST_LOG=info ./fnn -c node2/config.yml -d node2

# Terminal 3
RUST_LOG=info ./fnn -c node3/config.yml -d node3
```

## Creating Stablecoin Payment Channels

### 1. Connect Node 1 and Node 2

Establish a connection between the nodes:

```sh
curl --location 'http://127.0.0.1:8227' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": 42,
    "jsonrpc": "2.0",
    "method": "connect_peer",
    "params": [
      {
        "address": "/ip4/127.0.0.1/tcp/8238/p2p/QmSRjNWQ1ZFwniCdBfb9xHG16fCwzKMwBJ5o2JL5wKb22X"
      }
    ]
  }'
```

### 2. Create a Stablecoin Channel

Open a channel with 10 RUSD from Node 1 to Node 2:

```sh
curl --location 'http://127.0.0.1:8227' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": 42,
    "jsonrpc": "2.0",
    "method": "open_channel",
    "params": [
      {
        "peer_id": "QmSRjNWQ1ZFwniCdBfb9xHG16fCwzKMwBJ5o2JL5wKb22X",
        "funding_amount": "0x3b9aca00",
        "public": true,
        "funding_udt_type_script": {
          "code_hash": "0x1142755a044bf2ee358cba9f2da187ce928c91cd4dc8692ded0337efa677d21a",
          "hash_type": "type",
          "args": "0x878fcc6f1f08d48e87bb1c3b3d5083f23f8a39c5d5c764f253b55b998526439b"
        }
      }
    ]
  }'
```

The response will contain a temporary channel ID:

```sh
{
  "jsonrpc": "2.0",
  "result": {"temporary_channel_id": "0x4a62f1963882e0a7476582bd397ca2a1faf86c202e5dc4e6b66d7914ce9a2761"},
  "id": 42
}
```

### 3. Monitor Channel Status

Wait until the `channel_state` becomes `CHANNEL_READY`:

```sh
curl --location 'http://127.0.0.1:8227' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": 42,
    "jsonrpc": "2.0",
    "method": "list_channels",
    "params": [
      {
        "peer_id": "QmSRjNWQ1ZFwniCdBfb9xHG16fCwzKMwBJ5o2JL5wKb22X"
      }
    ]
  }'
```

## Connect Node 2 and Node 3

Repeat the connection and channel creation process between Node 2 and Node 3.

## Generating Stablecoin Invoices and Making Payments

### 1. Generate a Stablecoin Invoice on Node 2

```sh
curl --location 'http://127.0.0.1:8237' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": 42,
    "jsonrpc": "2.0",
    "method": "new_invoice",
    "params": [
      {
        "amount": "0x3b9aca00",
        "currency": "Fibt",
        "description": "test invoice generated by node2",
        "final_cltv": "0x28",
        "payment_preimage": "0x5d3baba4cc5355dbecd27d558a2849604df15d7474144a5dfedb669cb8039cbd",
        "expiry": "0xe10",
        "hash_algorithm": "sha256",
        "udt_type_script": {
          "code_hash": "0x1142755a044bf2ee358cba9f2da187ce928c91cd4dc8692ded0337efa677d21a",
          "hash_type": "type",
          "args": "0x878fcc6f1f08d48e87bb1c3b3d5083f23f8a39c5d5c764f253b55b998526439b"
        }
      }
    ]
  }'
```

`payment_preimage` is a set of random bytes and can be generated using `openssl rand -hex 32`.

The response will include an invoice address that can be used for payment:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "invoice_address": "fibt10000000001p98tjdhf7emczxzat8lhtag2ulnd9vthgash247nujysgazu2zqd7ava6w7t7e5fj0l3rl34zuhjfjsqp7tcemg83rkpxztpv0qrtmxtjua5uxsqp34tnjq4uvyh0zc9s9pp4hyxuauelxfgwh8sfwhs7q5aan9kk9ujy0s08j22eu3gzya3dusksyqfs64kswc7v77wcfp2wuql0f2z754ecxsglw2fnsdc2cs38p7p9q7r7grm5389sdnw25c9v04ks3t34f04j6t7tgps7nnm9vr3tf5x5mk73lsx3zgaz3jl7a2h25gerjhht99ucc9a9tw6dmlyzy2uqjuhh5kehzsevjp8qym5vxuzamd9vm9jpvlhacjep4pawls5czkuq39xfgqqz8f99e0xlhf9kdauvhqcpxep0f3lv8vmqkrc0uu955l2jy5907cxlxrqncg7cz9ekryflhwqxlzj5h7fmf4s5vlyy8rhk5vgptqsw67",
    "invoice": {
      "currency": "Fibt",
      "amount": "0x3b9aca00",
      "signature": "110506090800000207090505190f061f170905160d1d1c0c170018010619010f09111f0c070c1b001603180f1c1c0514141f0a120414050f1e18061f0603001318081e18020519160304091f170e00061f021214171e091b091510140c1f040407031716140c0801",
      "data": {
        "timestamp": "0x19662411ac8",
        "payment_hash": "0x98eed206ca5637624796212d29017aaec97700708d5b08f031ab21b3708a1d1f",
        "attrs": [
          {"description": "test invoice generated by node2"},
          {"expiry_time": "0xe10"},
          {"udt_script": "0x550000001000000030000000310000001142755a044bf2ee358cba9f2da187ce928c91cd4dc8692ded0337efa677d21a0120000000878fcc6f1f08d48e87bb1c3b3d5083f23f8a39c5d5c764f253b55b998526439b"},
          {"hash_algorithm": "sha256"},
          {"payee_public_key": "028b461870f297399c0a24d78abc169669e81db958008748ae879efbbe1f2b2d85"}
        ]
      }
    }
  },
  "id": 42
}
```

### 2. Send a Stablecoin Payment

Node 1 can now send a payment using the invoice address:

```sh
curl --location 'http://127.0.0.1:8227' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": 42,
    "jsonrpc": "2.0",
    "method": "send_payment",
    "params": [
      {
        "invoice": "fibt10000000001p98tjdhf7emczxzat8lhtag2ulnd9vthgash247nujysgazu2zqd7ava6w7t7e5fj0l3rl34zuhjfjsqp7tcemg83rkpxztpv0qrtmxtjua5uxsqp34tnjq4uvyh0zc9s9pp4hyxuauelxfgwh8sfwhs7q5aan9kk9ujy0s08j22eu3gzya3dusksyqfs64kswc7v77wcfp2wuql0f2z754ecxsglw2fnsdc2cs38p7p9q7r7grm5389sdnw25c9v04ks3t34f04j6t7tgps7nnm9vr3tf5x5mk73lsx3zgaz3jl7a2h25gerjhht99ucc9a9tw6dmlyzy2uqjuhh5kehzsevjp8qym5vxuzamd9vm9jpvlhacjep4pawls5czkuq39xfgqqz8f99e0xlhf9kdauvhqcpxep0f3lv8vmqkrc0uu955l2jy5907cxlxrqncg7cz9ekryflhwqxlzj5h7fmf4s5vlyy8rhk5vgptqsw67"
      }
    ]
  }'
```

### 3. Check Channel Balance

Verify the payment by checking the channel balance:

```sh
curl --location 'http://127.0.0.1:8227' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": 42,
    "jsonrpc": "2.0",
    "method": "list_channels",
    "params": [
      {
        "peer_id": "QmSRjNWQ1ZFwniCdBfb9xHG16fCwzKMwBJ5o2JL5wKb22X"
      }
    ]
  }'
```

### 4. Multi-Node Payment

To demonstrate a full multi-node payment path, you can:

1. Set up a similar payment channel from Node 2 to Node 3
2. Generate an invoice on Node 3
3. Make a payment from Node 1 that routes through Node 2 to Node 3

## Closing the Channel

When you're done with the payment channel, you can close it:

```sh
curl --location 'http://127.0.0.1:8227' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": 42,
    "jsonrpc": "2.0",
    "method": "shutdown_channel",
    "params": [
      {
        "channel_id": "0x9e27ad3c4935af445e8d1b1fdf1cca3615ce7f761be079eda88e242c39d7fc7c",
        "close_script": {
          "code_hash": "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
          "hash_type": "type",
          "args": "0xe266ef916081dbf19e13f1a485bbbc2206a01dc1"
        },
        "fee_rate": "0x3FC"
      }
    ]
  }'
```

Verify the channel has been closed:

```sh
curl --location 'http://127.0.0.1:8227' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": 42,
    "jsonrpc": "2.0",
    "method": "list_channels",
    "params": [
      {
        "peer_id": "QmSRjNWQ1ZFwniCdBfb9xHG16fCwzKMwBJ5o2JL5wKb22X"
      }
    ]
  }'
```

## Important Notes

- Always ensure you have sufficient Testnet funds from the faucets before getting started
- When using UDTs like stablecoins, you must specify the correct `funding_udt_type_script`
- Keep track of your channel IDs and peer IDs
- Monitor your node logs for any errors or important messages
- Make sure to properly close channels when they're no longer needed
