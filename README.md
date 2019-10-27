# Clone project -  Generator differences!

[![Maintainability](https://api.codeclimate.com/v1/badges/3b4792f94876bbf6cb9d/maintainability)](https://codeclimate.com/github/Viacheslav80/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3b4792f94876bbf6cb9d/test_coverage)](https://codeclimate.com/github/Viacheslav80/backend-project-lvl2/test_coverage)
[![Build Status](https://travis-ci.org/Viacheslav80/backend-project-lvl2.svg?branch=master)](https://travis-ci.org/Viacheslav80/backend-project-lvl2)

## installing
 
build the pocket.

```
$ uses_folder/make publish 
```
install pocket of global

```
$ uses_folder/npm link
```

![](gif/gendiff.gif)

Use to compare:

```
$ gendiff <any_file>.json  <any_file2>.json 
```

![](gif/gendiff_1.gif)

```
$ gendiff <any_file>.yml  <any_file2>.yml
```

![](gif/gendiff_2.gif)

```
$ gendiff <any_file>.ini  <any_file2>.ini
```

![](gif/gendiff_3.gif)

Compare deep files:

```
$ gendiff <deep_file>.json <dep_file2>.json
```

![](gif/gendiff_4.gif)

