nwsm
====

Node.js Webkit Service Manager

1- Download [node-webkit](https://github.com/rogerwang/node-webkit) and unpack into `$HOME/bin`

2- Edit your `~/.bashrc` and add:
```bash
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# Change node-webkit-v0.9.2-linux-x64 to correct dir
export NW_HOME=$HOME/bin/node-webkit-v0.9.2-linux-x64
PATH=$NW_HOME:$PATH

if [[ -n "$LD_LIBRARY_PATH" ]]; then
    LD_LIBRARY_PATH=$NW_HOME:$LD_LIBRARY_PATH
else
    LD_LIBRARY_PATH=$NW_HOME
fi
export LD_LIBRARY_PATH
```

3- Enter in $NW_HOME and create link to libudev.so.0 -> /lib/x86_64-linux-gnu/libudev.so.1
```
$ cd $NW_HOME
$ ln -s /lib/x86_64-linux-gnu/libudev.so.1 libudev.so.0
```

4- Clone this project, install dependencies and run nw-gyp rebuild
```
$ cd ~
$ git clone https://github.com/joaoneto/nwsm.git
$ cd nwsm/node_modules/usage
$ nw-gyp rebuild --target=0.9.2
```
5- Run
```
$ cd ~/nwsm
$ nw .
```
