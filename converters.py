import os
import json
import shutil

import jinja2
from jinja2 import Environment, FileSystemLoader, select_autoescape

class WebDocumentConverter(object):
	""" This is a base converter class that sets-up the correct enviroment. This class is not to be used directly but inherited by the converters.

	"""

	def __init__(self,app='ice',templates='src/templates'):
		"""
			`app` is the python package to use, defaults to `ice`. `templates is the directory where the jinja2 templates are stored, defaults to `templates`.
		"""

		self.env = Environment(
		    loader=FileSystemLoader(templates),
		    autoescape=select_autoescape(['html', 'xml'])
		)


class MilConverter(WebDocumentConverter):
	""" Converts interface configs into documents of your choice. """

	def __init__(self,config, **args):
		"""
			`config` is an interface config file. Available optional arguments are:
				- template
				- outfile
		"""

		# Set-up the enviroment
		super(MilConverter,self).__init__()
		self.config = config


	def convert(self, directory='dist', static='static'):
		"""
			Converts an interface config into the file specfied by `format` using the theme `theme`. `theme` defaults to the ice theme.

			`static` is the name of the directory to copy any static files to the build, defaults to `static`
		"""

		# Create messages page (shows all messages)
		template = self.env.get_template('messages.html')
		result = template.render(company=self.config['company'], messages=self.config['MIL-STD-1553']['messages'],modeCodes=self.config['MIL-STD-1553']['mode codes'])
		


		buildfile = os.path.join(directory,'mil.html')
		f = open(buildfile, 'wb')
		f.write(result)
		f.close()		


		# Create message pages (shows each word for a message)
		template = self.env.get_template('message.html')
		messages = self.config['MIL-STD-1553']['messages']
		for message in messages:
			result = template.render(company=self.config['company'], words=message['words'],name=message['name'], sa=message['subaddress'],wordsjson=json.dumps(message['words']))
			fileName = str(message['subaddress']) + '.html' 
			buildfile = os.path.join(directory,fileName)
			f = open(buildfile, 'wb')
			f.write(result)
			f.close()

		# Provide data for each word
		staticLocation = os.path.join(directory,'static')
		dataFile = os.path.join(staticLocation,'messages.json')
		f = open(dataFile,'wb')
		json.dump(messages,f)


class ArincConverter(WebDocumentConverter):
	""" Converts arinc-429 section of interface config into static web pages. """

	def __init__(self,config):
		"""
			`config` is an interface config file.
		"""

		# Set-up the enviroment
		super(ArincConverter,self).__init__()
		self.config = config


	def convert(self, directory='dist', static='static'):
		NotImplemented

class WebConverter(WebDocumentConverter):
	""" Converts and interface config into a web document """

	def __init__(self, config):
		""" `config` file is the name of the interface config """

		# Set-up the enviroment
		super(WebConverter,self).__init__()

		# Decode the config file
		f = open(config, 'r')
		self.config = json.load(f)

		# Get what interfaces we have
		interfaces = ['MIL-STD-1553','ARINC-429','AFDX']
		self.interfaces = list()
		for interface in interfaces:
			if self.config.has_key(interface):
				self.interfaces.append(interface)

		self.milconverter = MilConverter(self.config)

	def convert(self, directory='dist', static='static'):
		"""
			Converts an interface config into a static web page.

			`static` is the name of the directory to copy any static files to the build, defaults to `static`

			`directory` is name of the build output file
		"""

		# the build directory
		if not os.path.exists(directory):
			os.makedirs(directory)

		# Main page
		fileName = 'home.html'
		template = self.env.get_template(fileName)
		result = template.render(company=self.config['company'],interfaces=self.interfaces)
		buildfile = os.path.join(directory,fileName)
		f = open(buildfile, 'wb')
		f.write(result)
		f.close()

		# move any static files
		staticLocation = os.path.join(directory,'static')
		if os.path.exists(staticLocation):
			shutil.rmtree(staticLocation)
		shutil.copytree(os.path.join('src',static),staticLocation)


		# Convert each interface
		self.milconverter.convert()


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
	document = WebConverter(CONFIG)
	document.convert()