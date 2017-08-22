import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
import datetime

from subprocess import CalledProcessError

import argparse


class MyHandler(FileSystemEventHandler):
    def on_modified(self, event):
        try:
            subprocess.check_call(['python','converters.py'])
        except CalledProcessError:
            # Carry on - error will be propogated 
            print "\nWatching for changes..."
        else:
            print "Files created in dist at: " + datetime.datetime.now().isoformat()


parser = argparse.ArgumentParser(description="Watch stuff")
parser.add_argument('--path',default='src',dest='path',help="The path to watch")
args = parser.parse_args()


event_handler = MyHandler()
observer = Observer()
observer.schedule(event_handler, path=args.path, recursive=True)
observer.start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    observer.stop()
observer.join()