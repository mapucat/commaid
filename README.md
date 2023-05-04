```
      ___           ___           ___           ___           ___                      _____    
     /  /\         /  /\         /__/\         /__/\         /  /\        ___         /  /::\   
    /  /:/        /  /::\       |  |::\       |  |::\       /  /::\      /  /\       /  /:/\:\  
   /  /:/        /  /:/\:\      |  |:|:\      |  |:|:\     /  /:/\:\    /  /:/      /  /:/  \:\ 
  /  /:/  ___   /  /:/  \:\   __|__|:|\:\   __|__|:|\:\   /  /:/~/::\  /__/::\     /__/:/ \__\:|
 /__/:/  /  /\ /__/:/ \__\:\ /__/::::| \:\ /__/::::| \:\ /__/:/ /:/\:\ \__\/\:\__  \  \:\ /  /:/
 \  \:\ /  /:/ \  \:\ /  /:/ \  \:\~~\__\/ \  \:\~~\__\/ \  \:\/:/__\/    \  \:\/\  \  \:\  /:/ 
  \  \:\  /:/   \  \:\  /:/   \  \:\        \  \:\        \  \::/          \__\::/   \  \:\/:/  
   \  \:\/:/     \  \:\/:/     \  \:\        \  \:\        \  \:\          /__/:/     \  \::/   
    \  \::/       \  \::/       \  \:\        \  \:\        \  \:\         \__\/       \__\/    
     \__\/         \__\/         \__\/         \__\/         \__\/                              

```

<div align="center">
    <img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/mapuroglob/commaid/develop">
</div>

# Commaid

Manage several projects simultaneously in one place

**Important:**
This project includes code adapted from PM2 by Strzelewicz Alexandre, available at [PM2]<https://www.npmjs.com/package/pm2>, licensed under the GNU AGPL 3.0 license.

## Requirements

Install [Node.js](https://nodejs.org/en/) version >=10.0.0

You can install Node.js easily with [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) or [ASDF](https://blog.natterstefan.me/how-to-use-multiple-node-version-with-asdf).

### Install

Using NPM:

```bash
npm install -g commaid
```

### Configurations

#### Files

Config folder is defined as `~/.commaid` by default.
Config file's name is `projects-config.json` by default.

#### Environment variables

Use `.env-sample` file as example and replace vars values.

**Environment Values**

| Variable       | Required      | Description                                           |
| -------------- | ------------- | ----------------------------------------------------- |
| `USER`         | TRUE          | Value to be replaced on a url for some projects.      |

#### Update

This values could be updated modifying `CONFIG_FOLDER` and `CONFIG_FILE` constants inside `src/constants.ts`.

## Scripts available

There are some facilities that have been created to improve your mental health working with several projects.

### Generate initial config file

Generate a default file with sample values into config folder.

```bash
commaid init
```

### `clone` projects

Clone the projects defined on runnableProjects AND noRunnableProjects in `CONFIG_FILE`.
The workind directory for these projects corresponds to the one defined on projectsLocation in `CONFIG_FILE`.

```bash
commaid clone [<projectName1> <projectName2> <projectNameN> ...]
```

- Clone ALL projects.

```bash
commaid clone
```

- Clone SOME projects.

```bash
commaid clone project1 project2
```

### `install` projects

Install the projects defined on runnableProjects AND noRunnableProjects in `CONFIG_FILE`.
The workind directory for these projects corresponds to the one defined on projectsLocation in `CONFIG_FILE`.

```bash
commaid install [<projectName1> <projectName2> <projectNameN> ...]
```

- Install ALL projects.

```bash
commaid install
```

- Clone SOME projects.

```bash
commaid install project1 project2
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
