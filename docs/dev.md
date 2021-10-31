# Developer Guide

Modified: 2021-11

# Infrastructure
This application is built on a docker image stack containing the front-end (client), the backend (this repository) and a postgres container. When developing on the api locally the api container is built and then mounts the root of this repository inside the container so rapid development features such as reload on save are available. The development stack also pulls the latest image release from the client repository and a brand new postgres container for sandbox testing.

## Getting started
The development environment sources environment variables from a `.env` file in the root. Create a copy of the `sample.env` file in the root:
```bash
cp sample.env .env
```

Add your github personal access token. If you do not have a token you can create one by following this [guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). 
> NOTE: Make sure your personal access token has at minimum the read:packages permission checked

To spin up these services locally (ensure docker engine/daemon is running on your machine):
```bash
npm run dev
```

## Guidelines

### Workspaces
This repository is optimized for use with vscode's workspaces. The `api.code-workspace` file in the root defines the development environment in order to homogenize and standardize all work. To get started, when opening this repository in vscode a prompt will appear in the bottom right about the code workspace. Alternatively you can open the `api.code-workspace` directly and click the blue 'Open Workspace' button on the bottom right  After you open the repository as a workspace your environment will be configured.
> Please also install all the recommended extensions for the workspace.

### Linting
Ensure your code is linted. If your workspace is setup correctly you should get squiggles in vscode if there is a rule infraction. You can periodically check your code is linted manually:
```bash
npm run lint
```