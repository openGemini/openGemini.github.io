---
order: 2
---

# Docker

This section first introduces how to quickly experience openGemini through Docker, and then explains how to use openGemini for writing and querying in a Docker environment. If you are not familiar with Docker, you can use the [manual installation](./get_started.md) method to experience it quickly. If you are interested in contributing code to openGemini or are interested in its internal technical implementation, you can download the source code from the [openGemini GitHub](https://github.com/openGemini/openGemini) homepage for building and installation.

## Experience with Docker

1. Install the [Docker](https://www.docker.com/products/docker-desktop/) environment

2. Use the latest openGemini container image:

   ```shell
   docker run -d --name opengemini opengeminidb/opengemini-server:latest
   ```

   Or specify a version of the container image:

   ```shell
   docker run -d --name opengemini opengeminidb/opengemini-server:v1.0.1
   ```

3. Connect to openGemini cli:

   ```shell
   docker exec -it opengemini ts-cli
   ```

4. Basic operations

   You can refer to the [basic operations in the manual installation section](./get_started.md#基本操作)

5. Stop/Delete container

   ```shell
   docker stop opengemini
   docker rm opengemini
   ```

6. For more usage, please refer to:

   [Docker Hub Website](https://hub.docker.com/r/opengeminidb/opengemini-server)