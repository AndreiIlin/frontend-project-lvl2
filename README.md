### Hexlet tests and linter status:
[![Actions Status](https://github.com/AndreiIlin/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/AndreiIlin/frontend-project-lvl2/actions)
<a href="https://codeclimate.com/github/AndreiIlin/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/66253a816f0ac2eafa5a/maintainability" /></a>
[![Linter check](https://github.com/AndreiIlin/frontend-project-lvl2/actions/workflows/Eslint.yml/badge.svg)](https://github.com/AndreiIlin/frontend-project-lvl2/actions/workflows/Eslint.yml)
[![Tests check](https://github.com/AndreiIlin/frontend-project-lvl2/actions/workflows/Tests%20check.yml/badge.svg)](https://github.com/AndreiIlin/frontend-project-lvl2/actions/workflows/Tests%20check.yml)
<a href="https://codeclimate.com/github/AndreiIlin/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/66253a816f0ac2eafa5a/test_coverage" /></a>
#This is second hexlet project:

**The project allows you to generate the differences between two JSON or YAML format files** 

The resulting difference can be represented in one of three possible formats:  

* stylish
* plain
* JSON  

To see helpdesk use command `gendiff -h`.
## Setup  

Clone this repo to your desktop and run `npm ci` to install all the dependencies.
## Stylish format  

Stylish format show the difference in the form of AST tree with symbols `+` and `-`.  

Symbol `+` mean values was added.  
Symbol `-` mean values was deleted.  
If the values do not have any symbols, this means that they are in both files

Use command `gendiff --format stylish <filepath1> <filepath2>`

**Example of comparing two JSON format flat files:**
[![asciicast](https://asciinema.org/a/aUPYtyiGH5sbHMgBGcsdV1VOt.png)](https://asciinema.org/a/aUPYtyiGH5sbHMgBGcsdV1VOt)
**Example of comparing two YAML format flat files:**
[![asciicast](https://asciinema.org/a/ATDhEnYJDLUmqNDdyCPCtYCu4.png)](https://asciinema.org/a/ATDhEnYJDLUmqNDdyCPCtYCu4)

If files with nested objects are compared and the key with nested object is present in only one file, the nested object is not compared 

**An example of comparing two files with nested objects:**
[![asciicast](https://asciinema.org/a/F25mVBd3gv7XNOF9WudCjqULg.png)](https://asciinema.org/a/F25mVBd3gv7XNOF9WudCjqULg)
##Plain format

Plain format show the difference as strings with a difference values  

There are 3 types of values:
* added
* deleted
* updated. From deleted value to added value

Value that was not compared present as `[complex value]`

Use command `gendiff --format plain <filepath1> <filepath2>`

**Example of comparing two files:**
[![asciicast](https://asciinema.org/a/5LnlkoZw8dCKri4VOEsv9Pc4I.png)](https://asciinema.org/a/5LnlkoZw8dCKri4VOEsv9Pc4I)
##JSON format

JSON format show the difference as a file format JSON, with all the internal logic of file comparison

There are 5 statuses of values:
* added (was only in second file)
* deleted (was only in first file)
* changed (was in both files, but was changed, with added and deleted values)
* unchaged (was the same in both files)
* node (is node with a child values)

Use command `gendiff --format json <filepath1> <filepath2>`

**Example of comparing two files:**
[![asciicast](https://asciinema.org/a/DIvJXpVQQIgNpb2Ql3UTKld1r.png)](https://asciinema.org/a/DIvJXpVQQIgNpb2Ql3UTKld1r)
