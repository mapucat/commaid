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
    <img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/mapuroglob/commaid/master">
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
npm install commaid -g
```

### Configuration

Config folder is defined as `~/.commaid` by default.
Config file's name is `projects-config.json` by default.

#### Update

This values could be updated modifying `CONFIG_FOLDER` and `CONFIG_FILE` constants inside `src/constants.ts`.

## Scripts available

There are some facilities that have been created to improve your mental health working with several projects.

### Generate initial config file

Generate a default file with sample values into config folder.

```bash
commaid init
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
