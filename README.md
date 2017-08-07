# Intro

The goal of **Face** is to help you rapidly develop your next interface documentation, code and test tools.

It currently takes a config file and outputs a static web page. The plan is to add code and test tools and different format of documents.

# Install

Install the required dependencies:

```
pip install -r requirements.txt
```

It is recommened to use a virtual enviroment (virtualenv).

# Usage


```
python converters.py
```

This will create a `/dist` directory that includes all the required documentation files to serve a static web page. Run the command below in the `/dist` directory to serve the generated docs: 

```
python -m SimpleHTTPServer
```

# Config

The repo comes with an example config file `example.json` that the `converters.py` script uses as default.


# Utlities

The repo contains a `watch-converter` script, this will observe all files in the `/src` directoy and re-build when any files change. 
