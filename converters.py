import os
import json
import shutil

import jinja2
from jinja2 import Environment, FileSystemLoader, select_autoescape

class WebDocumentConverter(object):
	""" 
		This is a base converter class that sets-up the correct enviroment. 
		This class is not to be used directly but inherited by the converters.
	"""

	def __init__(self,templates='src/templates/web'):
		"""
			`templates is the directory where the jinja2 templates are stored, defaults to `templates`.
		"""

		self.env = Environment(
		    loader=FileSystemLoader(templates),
		    autoescape=select_autoescape(['html', 'xml'])
		)

		
	def write(self,pages):
		"""
			Writes all web pages to file. `pages` is a list of page dicts. 
			A `page` dict has a `data` key which is the string result returned from `template.render` 
			and `name` key which is the filename to write to
		"""

		# Write web pages
		for page in pages:	
			buildfile = os.path.join(self.directory,page['name'])
			f = open(buildfile, 'wb')
			f.write(page['data'])
			f.close()

class MilConverter(WebDocumentConverter):
	""" Converts interface configs into documents of your choice. """

	def __init__(self,config, directory='dist'):
		"""
			`config` is an interface config file. Available optional arguments are:
				- template
				- outfile
		"""

		# Set-up the enviroment
		super(MilConverter,self).__init__()
		self.config = config
		self.directory = directory


	def convert(self, static='static'):
		"""
			Converts an interface config into a MIL-STD-1553 webpage.
			`static` is the name of the directory to copy any static 
			files to the build, defaults to `static`
		"""

		# Pages
		pages = list()

		# Create messages page (shows all messages)
		template = self.env.get_template('mil1553/messages.html')
		result = template.render(company=self.config['company'], 
			messages=self.config['MIL-STD-1553']['messages'],
			modeCodes=self.config['MIL-STD-1553']['mode codes'])
		
		pages.append({"data":result,"name":'mil.html'})


		# Create message pages (shows each word for a message)
		template = self.env.get_template('mil1553/message.html')
		messages = self.config['MIL-STD-1553']['messages']
		for message in messages:
			result = template.render(company=self.config['company'], 
				words=message['words'],
				name=message['name'], 
				sa=message['subaddress'],
				wordsjson=json.dumps(message['words']))

			fileName = str(message['subaddress']) + '.html' 
			pages.append({"data":result,"name":fileName})

		# Create connector page
		template = self.env.get_template('mil1553/connectors.html')
		result = template.render(connectors=self.config['MIL-STD-1553']['connectors'])
		pages.append({"data":result,"name":'connectors.html'})


		#
		self.write(pages)

		# Provide data for each word
		staticLocation = os.path.join(self.directory,'static')
		dataFile = os.path.join(staticLocation,'messages.json')
		f = open(dataFile,'wb')
		json.dump(messages,f)

class ArincConverter(WebDocumentConverter):
	""" Converts arinc-429 section of interface config into static web pages. """

	def __init__(self,config, directory='dist'):
		"""
			`config` is an interface config file.
		"""

		# Set-up the enviroment
		super(ArincConverter,self).__init__()
		self.config = config
		self.directory = directory


	def convert(self, static='static'):
		"""
			Converts an interface config into a ARINC-429 webpage.
			`static` is the name of the directory to copy any static 
			files to the build, defaults to `static`
		"""

		messages = self.config['ARINC-429']['messages']

		# Create messages page (shows all messages)
		template = self.env.get_template('arinc429/message.html')
		result = template.render(company=self.config['company'], messages=messages)

		pages = [{"data":result,"name":'arinc.html'}]
		self.write(pages)

		# Provide data for each word
		staticLocation = os.path.join(self.directory,'static')
		dataFile = os.path.join(staticLocation,'labels.json')

		with open(dataFile,'wb') as f:
			json.dump(messages,f)		

class WebConverter(WebDocumentConverter):
	""" Converts an interface config into a web document """

	def __init__(self, config, directory='dist'):
		""" `config` file is the name of the interface config """

		# known interfaces
		INTERFACES = [{"name":'MIL-STD-1553',"link":'mil.html'},
			{"name":'ARINC-429',"link":'arinc.html'},
			{"name":'AFDX',"link":'afdx.html'}]

		# Set-up the enviroment
		super(WebConverter,self).__init__()
		self.directory = directory

		# Decode the config file
		with open(config, 'r') as f:
			self.config = json.load(f)

		self.interfaces = list()
		for interface in INTERFACES:
			if self.config.has_key(interface['name']):
				self.interfaces.append(interface)

		self.milconverter = MilConverter(self.config,directory=self.directory)
		self.arincconverter = ArincConverter(self.config,directory=self.directory)

	def convert(self, static='static'):
		"""
			Converts an interface config into a static web page.

			`static` is the name of the directory to copy any static files to the build, defaults to `static`

		"""

		# the build directory
		if not os.path.exists(self.directory):
			os.makedirs(self.directory)

		# pages
		pages = list()

		# Main page
		fileName = 'home.html'
		template = self.env.get_template(fileName)
		result = template.render(company=self.config['company'],
			interfaces=self.interfaces, 
			description=self.config['description'])
		pages.append({"data":result,"name":fileName})


		# Contact Us
		fileName = 'contact.html'
		template = self.env.get_template(fileName)
		result = template.render(company=self.config['company'],address=self.config['address'])
		pages.append({"data":result,"name":fileName})


		# You can guess what this does
		self.write(pages)

		# move any static files
		staticLocation = os.path.join(self.directory,'static')
		if os.path.exists(staticLocation):
			shutil.rmtree(staticLocation)
		shutil.copytree(os.path.join('src',static),staticLocation)


		# Call the specific converters for each type
		self.milconverter.convert(static)
		self.arincconverter.convert(static)

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