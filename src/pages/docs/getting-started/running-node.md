---
layout: ../../../layouts/DocLayout.astro
title: "Run a Fiber Node"
description: "Learn how to run a Testnet node on your local machine"
---

## Overview

This guide walks you through the process of setting up and running a [Fiber Network Node (FNN)](https://github.com/nervosnetwork/fiber) on the Testnet. You'll learn how to build the node from source or use a pre-built binary, configure it properly, and start it up.

## Prerequisites

- [Git](https://git-scm.com/) (if building from source)
- [Rust](https://www.rust-lang.org/) and [Cargo](https://doc.rust-lang.org/cargo/) (if building from source)
- Basic understanding of command line operations
- [ckb-cli](https://github.com/nervosnetwork/ckb-cli) tool for key management

## Building and Setting Up Your Node

### 1. Obtain the FNN Binary

You can either download a pre-built binary from the [Fiber GitHub Releases](https://github.com/nervosnetwork/fiber/releases) page or build it from source:

```sh
git clone https://github.com/nervosnetwork/fiber.git
cd fiber
cargo build --release
```

This document used the [v0.4.0 binary](https://github.com/nervosnetwork/fiber/releases/tag/v0.4.0) throughout the guide.

### 2. Create Node Directory

Create a dedicated directory for your node and copy the necessary files:

```sh
mkdir /folder-to/my-fnn
# If using released binary, replace target/release/fnn with the path to your downloaded binary
cp target/release/fnn /folder-to/my-fnn
cp config/testnet/config.yml /folder-to/my-fnn
cd /folder-to/my-fnn
```

### 3. Set Up Node Keys

FNN includes built-in wallet functionality for signing funding transactions. You'll need to create or import a private key:

create a new ckb account and get the `lock_arg` of the new account

```sh
ckb-cli account new

# example output
# address
#   mainnet: ckb1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqtp83cu4pk8nysm9dngxezw546dyr5w8esx7rlyt
#   testnet: ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqtp83cu4pk8nysm9dngxezw546dyr5w8esgvgswn
# address(deprecated):
#   mainnet: ckb1qyqxz0r3e2rv0xfpk2mxsdjyaft56g8gu0nq8cjjeq
#   testnet: ckt1qyqxz0r3e2rv0xfpk2mxsdjyaft56g8gu0nq6avd4u
# lock_arg: 0x613c71ca86c79921b2b6683644ea574d20e8e3e6
# lock_hash: 0x1c506178212949e961f5949c916f70f5ba0f3b89b14ce2608f02201a41eb3ef7
```

Then export the existing key

```sh
mkdir ckb
# Export an existing key using ckb-cli
ckb-cli account export --lock-arg <lock_arg> --extended-privkey-path ./ckb/exported-key
# Extract just the private key (FNN only needs this part)
head -n 1 ./ckb/exported-key > ./ckb/key
```

### 4. Start the Node

Launch your node with logging enabled:

```sh
RUST_LOG=info ./fnn -c config.yml -d .
```

The node will start syncing with the Testnet and output logs to the console. You can redirect the output to a file if needed.

## Version Compatibility and Upgrades

FNN is under active development, and protocol/storage format changes may occur between versions. Here's how to handle upgrades:

### Safe Upgrade Process

1. Close all active channels before upgrading:
   - Use RPC to [list all channels](./src/rpc/README.md#channel-list_channels)
   - [Close them](./src/rpc/README.md#channel-shutdown_channel) properly

2. Stop the node and clean the storage:

```sh
rm -rf /folder-to/my-fnn/fiber/store
```

3. Update the node:
   - Replace the FNN binary with the new version
   - Start the node again

### Storage Migration (Optional)

If you want to preserve channel states during an upgrade:

1. Stop your node
2. Back up your data:

```sh
cp -r /folder-to/my-fnn/fiber/store /folder-to/my-fnn/fiber/store.backup
```

3. Run the migration tool:

```sh
fnn-migrate -p /folder-to/my-fnn/fiber/store
```

4. Update and restart:
   - Replace the FNN binary
   - Start your node

## Next Steps

Once your node is running, you can:

- Connect to other peers
- Open payment channels
- Send and receive payments
- Explore more [RPC methods](https://github.com/nervosnetwork/fiber/blob/main/src/rpc/README.md)

Check out the [Basic Transfer Example](/docs/getting-started/basic-transfer) guide for a practical example of using your node.
