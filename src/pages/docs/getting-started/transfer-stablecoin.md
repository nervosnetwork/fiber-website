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
```

This document used the [v0.4.0 binary](https://github.com/nervosnetwork/fiber/releases/tag/v0.4.0) throughout the guide.

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

Each node needs its own configuration:

```sh
# In each node directory
mkdir ckb
# Use ckb-cli to export or generate keys
ckb-cli account export --lock-arg <lock_arg> --extended-privkey-path ./ckb/exported-key
head -n 1 ./ckb/exported-key > ./ckb/key
```

You can get Testnet funds from Faucets:

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
# This configuration file only contains the necessary configurations for the Testnet deployment.
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
        - out_point:
            tx_hash: 0x5a5288769cecde6451cb5d301416c297a6da43dc3ac2f3253542b4082478b19b
            index: 0x1
          dep_type: code
        - out_point:
            tx_hash: 0x5a5288769cecde6451cb5d301416c297a6da43dc3ac2f3253542b4082478b19b # ckb_auth
            index: 0x0
          dep_type: code
    - name: CommitmentLock
      script:
        code_hash: 0x740dee83f87c6f309824d8fd3fbdd3c8380ee6fc9acc90b1a748438afcdf81d8
        hash_type: type
        args: 0x
      cell_deps:
        - out_point:
            tx_hash: 0x5a5288769cecde6451cb5d301416c297a6da43dc3ac2f3253542b4082478b19b
            index: 0x2
          dep_type: code
        - out_point:
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
        - tx_hash: 0xed7d65b9ad3d99657e37c4285d585fea8a5fcaf58165d54dacf90243f911548b
          index: 0
          dep_type: code
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
        "address": "/ip4/127.0.0.1/tcp/8238/p2p/QmaQSn11jsAXWLhjHtZ9EVbauD88sCmYzty3GmYcoVWP2j"
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
        "peer_id": "QmS8y8sAoF7DH89st7fquUVW9Y1W3cgcnPgWjPe6tcm1dw",
        "funding_amount": "0x5f5e100",
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
  "result": {"temporary_channel_id": "0xbf1b507e730b08024180ed9cb5bb3655606d3a89e94476033cf34d206d352751"},
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
        "peer_id": "QmaQSn11jsAXWLhjHtZ9EVbauD88sCmYzty3GmYcoVWP2j"
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
        "amount": "0x5f5e100",
        "currency": "Fibb",
        "description": "test invoice generated by node2",
        "expiry": "0xe10",
        "final_cltv": "0x28",
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

The response will include an invoice address that can be used for payment:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "invoice_address": "fibb1000000001qgxlna32kkmczxzat8almqgp23lgsdfjzja4wp7n5mxsld70njckjxdrp80f59yqln8xalfh7stu653qs30mrk720ve9et7fdrat97uvdmj783j7ruw872t60v7pe6hfjutenr4njadjgacmfen0l46au9wfpe5sg5d6dpqmvjlaf88equldr8zlpum8v2twgrsedjfkt8ejq2tdarqmac57rx4mkrxashe6nm0xu59rzaqm9dxv3vzc9jc6890ccfwqlucswsn62p3yafgd7gep5x2p8uda0kxap40mglarrrm0cjcuaq48q07s9qg33kuhudnttfhpg5vy5sndgtk6z9lvtcgquyrv0tk9gykd5r8t8yxh8d40z96ce2uwrcmscakrxhtl2eu7k3ltusk77sy5",
    "invoice": {
      "currency": "Fibb",
      "amount": "0x5f5e100",
      "signature": null,
      "data": {
        "timestamp": "0x1924bd772e4",
        "payment_hash": "0x8f804fca8b611c43e05c82f23141faee236b6e0b7364c2f8b1b569e4f800b04a",
        "attrs": [
          {"Description": "test invoice generated by node2"},
          {"ExpiryTime": {"secs": 3600, "nanos": 0}},
          {"FinalHtlcMinimumCltvExpiry": 40},
          {"UdtScript": "0x550000001000000030000000310000001142755a044bf2ee358cba9f2da187ce928c91cd4dc8692ded0337efa677d21a0120000000878fcc6f1f08d48e87bb1c3b3d5083f23f8a39c5d5c764f253b55b998526439b"},
          {"HashAlgorithm": "sha256"},
          {"PayeePublicKey": "03c5627399cd37db17f7281926f7bc514d4687b4f541d4c52643d9d42c9a77ba68"}
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
        "invoice": "fibb1000000001qgxlna32kkmczxzat8almqgp23lgsdfjzja4wp7n5mxsld70njckjxdrp80f59yqln8xalfh7stu653qs30mrk720ve9et7fdrat97uvdmj783j7ruw872t60v7pe6hfjutenr4njadjgacmfen0l46au9wfpe5sg5d6dpqmvjlaf88equldr8zlpum8v2twgrsedjfkt8ejq2tdarqmac57rx4mkrxashe6nm0xu59rzaqm9dxv3vzc9jc6890ccfwqlucswsn62p3yafgd7gep5x2p8uda0kxap40mglarrrm0cjcuaq48q07s9qg33kuhudnttfhpg5vy5sndgtk6z9lvtcgquyrv0tk9gykd5r8t8yxh8d40z96ce2uwrcmscakrxhtl2eu7k3ltusk77sy5"
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
        "peer_id": "QmS8y8sAoF7DH89st7fquUVW9Y1W3cgcnPgWjPe6tcm1dw"
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
        "channel_id": "0x2329a1ced09d0c9eff46068ac939596bb657a984b1d6385db563f2de837b8879",
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
        "peer_id": "QmaQSn11jsAXWLhjHtZ9EVbauD88sCmYzty3GmYcoVWP2j"
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
