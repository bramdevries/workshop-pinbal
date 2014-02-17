# Pinball

## Step By Step installation

These steps are the same for Windows and OS X

1. Install Arduino IDE.
2. Install NodeJS.
3. Install Bower: `npm install -g bower`
4. Download this project, unzip it and place it in a folder.
5. Navigate to this folder in your terminal/command line.
6. Run `npm install`
7. Run `bower install`
8. Run `gulp` to compile assets.
9. Plug in the Arduino in an USB port.
10. Run `node index`
11. Navigate to [localhost:3000](http://localhost:3000) in a browser
12. Enjoy!

## Arduino setup

![Arduino setup](http://s.2to1.be/TxLm/arduino_setup.png)

* **Note**: The LED above the IR Receiver should be an IR Led.
* **Note**: You can add as many targets as long as you have pins (2 pins/target).
