import os
import json
import shutil

import jinja2
from jinja2 import Environment, FileSystemLoader, select_autoescape

class Converter(object):
	""" This is a base converter class that sets-up the correct enviroment. This class is not to be used as is but inherited by othe converters.

	"""

	def __init__(self,app='ice',templates='templates'):
		"""
			`app` is the python package to use, defaults to `ice`. `templates is the directory where the jinja2 templates are stored, defaults to `templates`.
		"""
		self.env = Environment(
		    loader=FileSystemLoader(templates),
		    autoescape=select_autoescape(['html', 'xml'])
		)

class DocumentConverter(Converter):
	""" Converts interface configs into documents of your choice. Intial conversion are into markdown format. Conversions are then done using the `pandoc` converter. Available converters are: """

	def __init__(self,config, **args):
		"""
			`config` is an interface config file. Available optional arguments are:
				- template
				- outfile
		"""

		# Set-up the enviroment
		super(DocumentConverter,self).__init__()

		# Decode the config file
		f = open(config, 'r')
		self.config = json.load(f)

	def convert(self,format='html', theme='ice', directory='dist', static='static'):
		"""
			Converts an interface config into the file specfied by `format` using the theme `theme`. `theme` defaults to the ice theme.

			`static` is the name of the directory to copy any static files to the build, defaults to `static`
		"""

		fileName = theme + '.' + format
		template = self.env.get_template(fileName)
		result = template.render(messages=self.config['MIL-STD-1553'],product=self.config['product'])

		if not os.path.exists(directory):
			os.makedirs(directory)

		print directory
		buildfile = os.path.join(directory,fileName)
		f = open(buildfile, 'wb')
		f.write(result)
		f.close()

		# move any static files
		staticLocation = os.path.join(directory,'static')
		shutil.copytree(static,staticLocation)

class OFPConverter(object):
	""" Converts interface configs into code of your choice. Available conversions are: """

	def __init__(config, **args):
		"""
			`config` is an interface config file. Available optional arguments are:
				- outfile
		"""

	def convert(language='c'):
		"""
			Converts an interface config into the programming language `language`. Default is `c`.
		"""

class TestToolConverter(object):
	""" Converts interface configs into a test tool configuration of your choice. Available configurations are: """	

	def __init__(config, **args):
		"""
			`config` is an interface config file. Available optional arguments are:
				- outfile
		"""

	def convert(tool='copilot'):
		"""
			Converts an interface config into a test tool definition specified by `tool`. Default is `c`.
		"""


if __name__ == "__main__":

	CONFIG = 'example.json'
	document = DocumentConverter(CONFIG)
	document.convert()