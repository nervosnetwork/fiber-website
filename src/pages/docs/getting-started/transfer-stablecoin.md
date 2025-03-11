---
layout: ../../../layouts/DocLayout.astro
title: "Stablecoin Transfer Example"
---

## Overview

This guide walks you through setting up and executing stablecoin transfers between nodes in the Fiber network. Unlike [native CKB transfers example](/docs/getting-started/basic-transfer), this example demonstrates how to use [User-Defined Tokens (UDTs)](https://docs.nervos.org/docs/tech-explanation/glossary#user-defined-token) in payment channels, specifically focusing on stablecoins like RUSD.

## Prerequisites

- Two or three Fiber Network Nodes (FNN) instances running
- Testnet CKB from the [CKB faucet](https://faucet.nervos.org/)
- RUSD testnet tokens from the [stablecoin faucet](https://testnet0815.stablepp.xyz/stablecoin)
- Basic understanding of command line operations
- [curl](https://curl.se/) or similar HTTP client for making RPC calls

## Setting Up Your Environment

### 1. Prepare Fiber Binary

Clone and build the Fiber repository:

```sh
git clone https://github.com/nervosnetwork/fiber.git
cd fiber
cargo build --release

# Download CKB CLI tool (needed for account operations)
wget https://github.com/nervosnetwork/ckb/releases/download/v0.117.0/ckb_v0.117.0_aarch64-apple-darwin-portable.zip
unzip ckb_v0.117.0_aarch64-apple-darwin-portable.zip

# Create working directory
mkdir tmp
cp target/release/fnn tmp
cp ckb_v0.117.0_aarch64-apple-darwin-portable/ckb-cli tmp
```

### 2. Configure Fiber Nodes

We'll set up three nodes for this tutorial. Each node needs its own configuration:

#### Node 1

```
cd tmp
mkdir -p testnet-fnn/node1/ckb
cp ../config/testnet/config.yml testnet-fnn/node1

# Generate account
./ckb-cli account new
./ckb-cli account export --lock-arg 0x30c54eb6b4ddb48b9335420abe0813e3e67f46e1 --extended-privkey-path exported-key
head -n 1 ./exported-key > testnet-fnn/node1/ckb/key
./ckb-cli util key-info --privkey-path testnet-fnn/node1/ckb/key

# Get testnet funds from faucets
# Visit https://faucet.nervos.org/ for CKB
# Visit https://testnet0815.stablepp.xyz/stablecoin for RUSD
```

#### Node 2

```
cd tmp
mkdir -p testnet-fnn/node2/ckb
cp ../config/testnet/config.yml testnet-fnn/node2
# Edit the config.yml to use different ports

# Generate account
./ckb-cli account new
./ckb-cli account export --lock-arg 0x30c54eb6b4ddb48b9335420abe0813e3e67f46e1 --extended-privkey-path exported-key2
head -n 1 ./exported-key2 > testnet-fnn/node2/ckb/key
./ckb-cli util key-info --privkey-path testnet-fnn/node2/ckb/key
```

#### Node 3

```
cd tmp
mkdir -p testnet-fnn/node3/ckb
cp ../config/testnet/config.yml testnet-fnn/node3
# Edit the config.yml to use different ports

# Generate account
./ckb-cli account new
./ckb-cli account export --lock-arg 0x6a22298591942ba030594dd46a396adec1ecd913 --extended-privkey-path exported-key3
head -n 1 ./exported-key3 > testnet-fnn/node3/ckb/key
./ckb-cli util key-info --privkey-path testnet-fnn/node3/ckb/key
```

### 3. Start All Nodes

Start each node in a separate terminal:

```
# Terminal 1
RUST_LOG=info ./fnn -c testnet-fnn/node1/config.yml -d testnet-fnn/node1

# Terminal 2
RUST_LOG=info ./fnn -c testnet-fnn/node2/config.yml -d testnet-fnn/node2

# Terminal 3
RUST_LOG=info ./fnn -c testnet-fnn/node3/config.yml -d testnet-fnn/node3
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
        "address": "/ip4/127.0.0.1/tcp/8230/p2p/QmaQSn11jsAXWLhjHtZ9EVbauD88sCmYzty3GmYcoVWP2j"
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
```
{
  "jsonrpc": "2.0",
  "result": {"temporary_channel_id": "0xbf1b507e730b08024180ed9cb5bb3655606d3a89e94476033cf34d206d352751"},
  "id": 42
}
```

### 3. Monitor Channel Status

Wait until the channel state becomes `CHANNEL_READY`:

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
curl --location 'http://127.0.0.1:8230' \
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

- Always ensure you have sufficient testnet funds from the faucets before starting
- When using UDTs like stablecoins, you must specify the correct `funding_udt_type_script`
- Keep track of your channel IDs and peer IDs
- Monitor your node logs for any errors or important messages
- Make sure to properly close channels when they're no longer needed 
