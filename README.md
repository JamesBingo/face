# Intro

The goal of **Face** is to help you rapidly develop your next interface documentation, code and test tools.

It currently takes a config file and outputs a static web page. The plan is to add code and test tools and different format of documents.

# Install

Grab the repo first:

```
git clone https://github.com/JamesBingo/Face.git face

```

Installation using virtualenv (recommended), change into the `face` directory:

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

Running the `converters` module directly will create a `/dist` directory that includes all the required files to serve a static web page. Run the command below in the `/dist` directory to serve the generated docs @localhost:8000: 

```
python -m SimpleHTTPServer
```

# Config

Currently only `.json` format is supported. The plan is to add `.yaml` aswell. 

The repo comes with an example config file `example.json` that the `converters.py` script uses as default.

The format of the json file is defined in `spec.txt` (needs updating!)


# Utlities

The repo contains a `watch-converter` script, this will observe all files in the `/src` directoy and re-build when any files change. 

```
python watch-converter.py
```
