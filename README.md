# Intro

The goal of **face** is to help you rapidly develop your next interface documentation, code and test tools.

Avionics equipment typically consists of developing requirements, code and verification tools. **face** aims to simplfy the entire process by
enabling the user to state there equipment interface in one place - a simple json/yaml config file. **face** will analyse its contents
and automatically create documentiton, code and test tools. An update to the interface (config file) will cause an update to all outputs therefore
solving the problem of keeping docs, code and test cases in sync. 

It currently takes a config file and outputs a static web page. The plan is to add code and test tools.

# Install

Grab the repo first:

```
git clone https://github.com/JamesBingo/face.git face

```

Installation using virtualenv (recommended), change into the `face` directory, only supports `Python2`:

```
virtualenv ENV
```

Activate the enviroment:

```
source ENV/bin/activate
```

Install the required dependencies:

```
pip install -r requirements.txt
```

# Usage


```
python converters.py
```

Running the `converters` module directly will create a `/dist` directory that includes all the required files to serve a static web page. Run the command below in the `/dist` directory to serve the generated docs @ <localhost:8000/home.html>: 

```
python -m SimpleHTTPServer
```

# Config

Currently only `.json` format is supported. The plan is to add `.yaml` aswell. 

The repo comes with an example config file `example.json` that the `converters.py` script uses as default.

# Utlities

The repo contains a `watch-converter` script that will observe all files in the `/src` directoy (if no arguments are provided) and re-build when any files in the directory change. 

```
python watch-converter.py
```

You can also specify a custom path to watch:

```
python watch-converter.py --path src/templates/code
```
