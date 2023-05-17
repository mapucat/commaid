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
    <img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/mapuroglob/commaid/main">
</div>

# Commaid

Manage several projects simultaneously in one place

**Important:**

This project includes code adapted from PM2 by Strzelewicz Alexandre, available at [PM2](https://www.npmjs.com/package/pm2), licensed under the GNU AGPL 3.0 license.

## Requirements

Install [Node.js](https://nodejs.org/en/) version >=10.0.0

You can install Node.js easily with [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) or [ASDF](https://blog.natterstefan.me/how-to-use-multiple-node-version-with-asdf).

## Install

Using NPM:

```bash
npm install -g commaid
```

## Configurations

### Config folder

Config folder is defined as `~/.commaid` by default.

**Note:** Config folder path could be changed by modifying `CONFIG_FOLDER` constants inside `src/constants.ts`.

### Config file

Config file's name is `projects-config.json` by default.

**Note:** Config file name could be changed by modifying `CONFIG_FILE` constants inside `src/constants.ts`.

```json
{
    // General section
    "cwd": "/Users/user-name/Documents/code",
    "user": "general_user",
    "projects": {
        // Each project section
        "freeCodeCamp": {
            "user": "specific_user",
            "originUrl": "git@github.com:freeCodeCamp/freeCodeCamp.git",
            "branches": {
                "main": "main",
                "dev": "develop"
            }
        },
        "pm2": {
            "isRunnable": false,
            "cwd": "/Users/user-name/Documents/code2",
            "originUrl": "git@github.com:Unitech/pm2.git",
            "branches": {
                "main": "master",
                "dev": "development"
            }
        }
    }
}
```

#### Overwrite `COMMANDS`

This project defines the next COMMON COMMANDS

```js
export const COMMON_COMMANDS = {
    clone: 'git clone <url>',
    install: 'npm install',
    update: 'git checkout <branch> && git pull origin <branch>',
    exec: ''
};
```

This commands could be overwrite using the [Config file](#config-file).

CONSIDERATIONS:
`CLONE COMMAND`: It uses `<url>` key word to reference project originURL.
`INSTALL COMMAND`: It uses `<url>` key word to reference project originURL.
`UPDATE COMMAND`: It uses `<branch>` key word to reference project branches properties.
`EXEC COMMAND`: You won't be able to modify `exec` behaviour.

**TO ALL PROJECTS** Define `commands` property in the general section of the [Config file](#config-file).
You can define each command separately or together.

Example 1.

```json
{
    "cwd": "/Users/user-name/Documents/code",
    "user": "general_user",
    "commands": {
        "clone": "git clone <url> --no-hardlinks"
    },
    "projects": {
        ...
    }
}
```

Example 2.

```json
{
    "cwd": "/Users/user-name/Documents/code",
    "user": "general_user",
    "commands": {
        "clone": "git clone <url> --no-hardlinks",
        "install": "git install --force",
        "update": "git checkout <branch> && git prune && git pull origin <branch>"
    },
    "projects": {
        ...
    }
}
```

**TO EACH PROJECT** Define `commands` property in each project section of your [Config file](#config-file).
You can define each command separately or together.

Example 1.

```json
{
    ...
    "projects": {
        "freeCodeCamp": {
            "user": "specific_user",
            "originUrl": "git@github.com:freeCodeCamp/freeCodeCamp.git",
            "branches": {
                "main": "main",
                "dev": "develop"
            },
            "commands": {
                "update": "git checkout <branch> && git prune && git pull origin <branch>"
            },
        },
        "pm2": {
            "isRunnable": false,
            "cwd": "/Users/user-name/Documents/code2",
            "originUrl": "git@github.com:Unitech/pm2.git",
            "branches": {
                "main": "master",
                "dev": "development"
            },
            "commands": {
                "install": "git install --force",
            },
        }
    }
}
```

#### Define `SCRIPTS`

It is posible to define custom scripts using the [Config file](#config-file).

**TO ALL PROJECTS** Define `scripts` property in the general section of the [Config file](#config-file).
You can define each script separately or together.

Example 1.

```json
{
    "cwd": "/Users/user-name/Documents/code",
    "user": "general_user",
    "script": {
        "dev": "npm run build && npm run dev",
        "stash": "git stash",
        "stash:pop": "git stash"
    },
    "projects": {
        ...
    }
}
```

**TO EACH PROJECT** Define `scripts` property in each project section of your [Config file](#config-file).
You can define each script separately or together.

Example 1.

```json
{
    ...
    "projects": {
        "freeCodeCamp": {
            "user": "specific_user",
            "originUrl": "git@github.com:freeCodeCamp/freeCodeCamp.git",
            "branches": {
                "main": "main",
                "dev": "develop"
            },
            "script": {
                "dev": "npm run build && npm run dev"
            }
        },
        "pm2": {
            "isRunnable": false,
            "cwd": "/Users/user-name/Documents/code2",
            "originUrl": "git@github.com:Unitech/pm2.git",
            "branches": {
                "main": "master",
                "dev": "development"
            },
            "script": {
                "stash": "git stash"
            }
        }
    }
}
```

#### Attributes available

**1. General:**
| Field         | Required | Type                          | Description                                                                     |
| ------------- | -------- | ----------------------------- | ------------------------------------------------------------------------------- |
| `projects`*   | TRUE     | *Project <sup>2</sup>* array  | Could be empty, projects to work with.                                          |
| `cwd`         | TRUE     | string                        | Projects main location.                                                         |
| `user`        | FALSE    | string                        | General project's git user. <br/> This value will be replaced on project's url. |
| `commands`*   | FALSE    | *Commands <sup>4</sup>*       | Possible executable accions in a project.                                       |
| `scripts`*    | FALSE    | *Scripts <sup>5</sup>*        | Executable scripts.                                                             |

**2. Project:**
| Field         | Required | Type                   | Description                                                                       |
| ------------- | -------- | ---------------------- | --------------------------------------------------------------------------------- |
| `isRunnable`  | FALSE    | boolean                | Represent whether or not project is capable of being executed, *true by default*. |
| `originUrl`   | TRUE     | string                 | Git project's url, could be the https or ssh url. <br/> This value could use `<user>` key to replace with the user defined dynamically.          |
| `branches`*   | TRUE     | string                 | Project's *branches <sup>3</sup>*.                                                |
| `cwd`         | FALSE    | string                 | Specific project's location.                                                      |
| `user`        | FALSE    | string                 | Specific project's git user. <br/> This value will be replaced on project's url.  |
| `commands`    | FALSE    | string                 | Possible executable accions in a project.                                         |
| `scripts`*    | FALSE    | *Scripts <sup>5</sup>* | Executable scripts.                                                               |

**3. Commands:**
| Field                  | Required | Type    | Description                                       |
| ---------------------- | -------- | ------- | ------------------------------------------------- |
| `clone`                | FALSE    | string  | Project's name.                                   |
| `install`              | FALSE    | string  | Git project's url, could be the https or ssh url. |
| `update`               | FALSE    | string  | Project's base branch.                            |

**4. Scripts:**

- Important: All projects defined should keep the same scripts structure.

| Field                  | Required | Type    | Description                                                                |
| ---------------------- | -------- | ------- | -------------------------------------------------------------------------- |
| `x`                    | FALSE    | string  | Executable script. <br/> You could define the number of branches you want. |

**5. Branches:**

- Important: All projects defined should keep the same branch structure.

| Field                  | Required | Type    | Description                                                             |
| ---------------------- | -------- | ------- | ----------------------------------------------------------------------- |
| `main`                 | TRUE     | string  | Base project's branch.                                                  |
| `x`                    | FALSE    | string  | Other branches. <br/> You could define the number of branches you want. |

---

## Usage

There are some facilities that have been created to improve your mental health working with several projects.

### Generate initial config file

Generate a default file with sample values into config folder.

```bash
commaid init
```

### `clone` projects

Clone the projects defined on `projects` in `CONFIG_FILE`.
The workind directory for these projects corresponds to the one defined on `cwd` in `CONFIG_FILE`.

```bash
commaid clone [options]

Options
    -s --stop-on-error           Stop process on installation error
    -p --projects [projects...]  List of projects to be affected (default: all)
```

- Clone ALL projects.

```bash
commaid clone
```

- Clone ALL projects, stopping on errors.

```bash
commaid clone -s
commaid clone --stop-on-error
```

- Clone SOME projects.

```bash
commaid clone -p project1 project2
```

- Clone SOME projects, stopping on errors.

```bash
commaid clone -p project1 project2 -s
commaid clone -p project1 project2 --stop-on-error
```

### `install` projects

Install the projects defined on `projects` in `CONFIG_FILE`.
The workind directory for these projects corresponds to the one defined on `cwd` in `CONFIG_FILE`.

```bash
commaid install [options]

Options
    -s --stop-on-error           Stop process on installation error
    -p --projects [projects...]  List of projects to be affected (default: all)
```

- Install ALL projects.

```bash
commaid install
```

- Install ALL projects, stopping on errors.

```bash
commaid install -s
commaid install --stop-on-error
```

- Install SOME projects.

```bash
commaid install -p project1 project2
```

- Install SOME projects, stopping on errors.

```bash
commaid install -p project1 project2 -s
commaid install -p project1 project2 --stop-on-error
```

### `update` projects

Update a branch into the projects defined on `projects` in `CONFIG_FILE`.
The workind directory for these projects corresponds to the one defined on `cwd` in `CONFIG_FILE`.

```bash
commaid update <branch> [options]

Options
    -s --stop-on-error           Stop process on installation error
    -p --projects [projects...]  List of projects to be affected (default: all)
```

- Update ALL projects.

```bash
commaid update main
```

- Update ALL projects, stopping on errors.

```bash
commaid update main -s
commaid update main --stop-on-error
```

- Update SOME projects.

```bash
commaid update main -p project1 project2
```

- Update SOME projects, stopping on errors.

```bash
commaid update main -p project1 project2 -s
commaid update main -p project1 project2 --stop-on-error
```

### `exec command` on projects

Exec a command into the projects defined on defined on `projects` in `CONFIG_FILE`.
The workind directory for these projects corresponds to the one defined on `cwd` in `CONFIG_FILE`.

```bash
commaid exec [options] -c <command> [-- <args>]

Options
    -s --stop-on-error           Stop process on installation error
    -p --projects [projects...]  List of projects to be affected (default: all)
```

- Exec a command on ALL projects.

```bash
commaid exec -c npm run test
# Using command args
commaid exec -c npm run test -- -u -t="ColorPicker"
```

- Exec a command on ALL projects, stopping on errors.

```bash
commaid exec -s -c npm run test
commaid exec --stop-on-error -c npm run test
# Using command args
commaid exec -s -c npm run test -- -u -t="ColorPicker"
commaid exec --stop-on-error -c npm run test -- -u -t="ColorPicker"
```

- Exec a command on SOME projects.

```bash
commaid exec -p project1 project2 -c npm run test
# Using command args
commaid exec -p project1 project2 -c npm run test -- -u -t="ColorPicker"
```

- Exec a command on SOME projects, stopping on errors.

```bash
commaid exec -p project1 project2 -s -c npm run test
commaid exec -p project1 project2 --stop-on-error -c npm run test
# Using command args
commaid exec -p project1 project2 -s -c npm run test -- -u -t="ColorPicker"
commaid exec -p project1 project2 --stop-on-error -c npm run test -- -u -t="ColorPicker"
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
