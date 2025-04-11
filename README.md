### `Taxstick Client Side`

## Quick Start

Install project dependencies by using yarn:

If NodeJs is not installed, then follow this step to install NodeJs:

```bash
$ https://nodejs.org/en/
```

After successfully installed, check NodeJs version. It will show some number.
```bash
$ node --version
```

If yarn is not installed, then use the following command to install yarn:

```bash
$ npm i -g yarn
```

Check yarn version, It will show some number.

```bash
$ yarn --version
```

#### Ignore this step, if you want to build for production
If you want to run this project locally, use this command:
```bash
$ yarn dev
```

Now, build this project for production deploy, run this command in project folder

```bash
$ yarn install
```

```bash
$ yarn buildexport
```

After successfully build, you will see `out` folder/directory 

```bash
$ out
```

In out folder, zip all files and deploy it in your server.